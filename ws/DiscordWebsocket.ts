import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Payload, GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from './constants';
const IDENTIFY_TIMEOUT = 1000;

interface ConnectionProperties {
  $browser: string;
  $device: string;
  $os: string;
}

// TODO implement rate limits
export default class DiscordWebsocket {
  autoReconnect = true;
  connectionProperties: ConnectionProperties;
  discordTrace?: string;
  largeThreshold?: number;
  ready = false;
  sessionID: string | null = null;
  ws: WebSocket | null = null;
  private _heartBeatInterval: NodeJS.Timeout | null = null;
  private _intents: number;
  private _lastHeartbeatAck = true;
  private _selfDisconnect = false;
  private _seq: number | null = null;
  private _token: string;
  private _url: string;

  constructor(token: string, url: string, intents: number, connProps: Partial<ConnectionProperties> = {}) {
    this._token = token;
    this._url = url;
    this._intents = intents;

    this._identify = this._identify.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this.connectionProperties = { $os: process.platform, $browser: 'dis.ts', $device: 'dis.ts', ...connProps };
  }

  connect() {
    this.initialize();
    return this;
  }

  disconnect(code?: number) {
    if (code === 1000 || code === 1001) {
      this.sessionID = null;
      this._seq = null;
    }
    this._selfDisconnect = true;
    this.ws?.close(code);
    return this;
  }

  initialize() {
    if (!this._url) throw new Error('Websocket URL not provided');

    this._selfDisconnect = false;
    if (this.ws) throw new Error('Attempted duplicate connection - run uninitialize');

    this.ws = new WebSocket(this._url);
    this.ws.once('close', this._onClose);
    this.ws.on('message', this._onMessage);
    this.ws.on('error', console.error);
    return this;
  }

  reset() {
    if (this._heartBeatInterval) clearInterval(this._heartBeatInterval);
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.off('message', this._onMessage)
        .off('error', console.error)
        .terminate();
    }
    this._heartBeatInterval = null;
    this.ws = null;
    this.ready = false;
    this._lastHeartbeatAck = true;
    return this;
  }

  restart(newSession = false) {
    if (newSession) this.sessionID = null;
    this.disconnect().connect();
  }

  // TODO Prevent 4013?
  send(
    op: GATEWAY_OPCODES.IDENTIFY | GATEWAY_OPCODES.RESUME | GATEWAY_OPCODES.HEARTBEAT | GATEWAY_OPCODES.REQUEST_GUILD_MEMBERS | GATEWAY_OPCODES.VOICE_STATE_UPDATE | GATEWAY_OPCODES.PRESENCE_UPDATE,
    d: any,
    override = false,
  ) {
    if (this.ws?.readyState !== WebSocket.OPEN) return false;
    if (override
      || (this.ws?.readyState === WebSocket.OPEN
        && ((this.ready && !(op === GATEWAY_OPCODES.IDENTIFY || op === GATEWAY_OPCODES.RESUME))
          || (!this.ready && (op === GATEWAY_OPCODES.IDENTIFY || op === GATEWAY_OPCODES.RESUME))
        )
      )
    ) {
      this.ws.send(JSON.stringify({ op, d }));
      return true;
    }
    return false;
  }

  setIntents(intents: number) {
    this._intents = intents;
  }

  setToken(token: string) {
    this._token = token;
  }

  setURL(url: string) {
    this._url = url;
  }

  private _heartbeat(scheduled = false) {
    if (scheduled) {
      if (!this._lastHeartbeatAck) {
        console.error(new Error('No heartbeat acknowledgement'));
        return this.restart(true);
      }
      this._lastHeartbeatAck = false;
    }
    this.send(GATEWAY_OPCODES.HEARTBEAT, this._seq, true);
  }

  private _hello(d: { _trace: string; heartbeat_interval: number }) {
    this._heartBeatInterval = setInterval(() => this._heartbeat(), d.heartbeat_interval);
    this.discordTrace = d._trace;

    if (this.sessionID) this._resume();
    else this._identify();
  }

  // TODO max_concurrency implemetation if necessary
  // TODO compression implementation
  private _identify() {
    if (!this._token) throw new Error('Unable to identify without a token');

    this.send(
      GATEWAY_OPCODES.IDENTIFY,
      {
        token: this._token,
        properties: this.connectionProperties,
        // compress: this.compress,
        large_threshold: this.largeThreshold,
        // shard: [this.id, totalShards],
        // presence: presence idk,
        intents: this._intents,
      },
      true,
    );
  }

  // TODO Construct proper errors
  private _onClose(code: GATEWAY_CLOSE_EVENT_CODES) {
    switch (code) {
      case GATEWAY_CLOSE_EVENT_CODES.UNKNOWN_ERROR:
      case GATEWAY_CLOSE_EVENT_CODES.UNKNOW_OPCODE:
      case GATEWAY_CLOSE_EVENT_CODES.DECODE_ERROR:
      case GATEWAY_CLOSE_EVENT_CODES.ALREADY_AUTHENTICATED:
      case GATEWAY_CLOSE_EVENT_CODES.RATE_LIMITED: this.restart(); break;
      case GATEWAY_CLOSE_EVENT_CODES.NOT_AUTHENTICATED:
      case GATEWAY_CLOSE_EVENT_CODES.INVALID_SESSION:
      case GATEWAY_CLOSE_EVENT_CODES.INVALID_RESUME_SEQUENCE: this._seq = null; break;
      case GATEWAY_CLOSE_EVENT_CODES.SESSION_TIMEOUT: setTimeout(() => this.restart(true), IDENTIFY_TIMEOUT); break;
      case GATEWAY_CLOSE_EVENT_CODES.AUTHENTICATION_FAILED: {
        this._token = '';
        this.reset();
        break;
      }
      case GATEWAY_CLOSE_EVENT_CODES.INVALID_SHARD: // Um..?
      case GATEWAY_CLOSE_EVENT_CODES.INVALID_INTENTS:
      case GATEWAY_CLOSE_EVENT_CODES.DISALLOWED_INTENTS: this.reset(); break;
      case GATEWAY_CLOSE_EVENT_CODES.INVALID_API_VERSION: { // REVIEW Discuss implications of falling back to hardcoded version
        if (this._url.includes('v=8')) {
          this.reset();
          console.error(new Error(`Hardcode fallback API version failed: ${this._url}`));
        }
        this._url = this._url.replace(/v=\d/, 'v=8');
        this.reset().connect();
        break;
      }
      default: {
        this.reset();
        if (!this._selfDisconnect && this.autoReconnect) this.connect();
        console.log(new Error(`Unknown close code: ${code}`));
      }
    }
  }

  private _onEvent(p: Payload) {
    const { d, t } = p;
    switch (t) {
      case 'READY': this.sessionID = d.session_id; this.ready = true; break;
      case 'RESUMED': this.ready = true; break;
      default: console.warn('Unhandled event: ', t);
    }
  }

  private _onMessage(data: string) {
    const p: Payload = JSON.parse(data);
    const { d, op, s, t } = p;

    if (s) this._seq = s;

    switch (op) {
      case GATEWAY_OPCODES.DISPATCH: this._onEvent(p); break;
      case GATEWAY_OPCODES.HEARTBEAT: this._heartbeat(); break;
      case GATEWAY_OPCODES.RECONNECT: this.restart(); break;
      case GATEWAY_OPCODES.INVALID_SESSION: setTimeout(this._identify, IDENTIFY_TIMEOUT); break;
      case GATEWAY_OPCODES.HELLO: this._hello(d); break;
      case GATEWAY_OPCODES.HEARTBEAT_ACK: this._lastHeartbeatAck = true; break;
      default: console.warn('UNKNOWN OP', { op, d, s, t });
    }
  }

  private _resume() {
    const call = () => this.send(
      GATEWAY_OPCODES.RESUME,
      {
        token: this._token,
        session_id: this.sessionID,
        seq: this._seq,
      },
      true,
    );

    if (this.ws?.readyState !== WebSocket.OPEN) this.ws?.once('open', call);
    else call();
  }
}
