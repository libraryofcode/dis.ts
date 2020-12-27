import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Payload } from './constants';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from '../util/Constants';

export default class WebSocketClient {
  private _intents: number;
  private _token: string;
  private _wsURL: string;
  private heartBeatInterval!: NodeJS.Timeout;
  private lastHeartbeatAck = true;
  private seq!: number;
  private sessionID!: string;
  private ws!: WebSocket;

  constructor(token: string, wsURL: string, intents: number) {
    this._token = token;
    this._wsURL = wsURL;
    this._intents = intents;

    this._identify = this._identify.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onMessage = this._onMessage.bind(this);
  }

  connect() {
    this.ws = new WebSocket(this._wsURL);
    this.ws.on('open', this._identify);
    this.ws.on('close', this._onClose);
    this.ws.on('message', this._onMessage);
  }

  private _heartbeat(expected: boolean) {
    if (expected) {
      if (!this.lastHeartbeatAck) {
        this._terminate();
        this.connect();
        this._resume();
        this.lastHeartbeatAck = true;
      } else {
        this.lastHeartbeatAck = false;
      }
    }
    this._sendWS(GATEWAY_OPCODES.HEARTBEAT, this.seq || null);
  }

  private _identify() {
    this._sendWS(GATEWAY_OPCODES.IDENTIFY, {
      token: this._token,
      intents: this._intents,
      properties: {
        $os: process.platform,
        $browser: 'Dis.ts',
        $device: 'Dis.ts',
      },
    });
  }

  private _onClose(code: number) {
    if (!GATEWAY_CLOSE_EVENT_CODES[code]) console.log(code);
    else console.log(GATEWAY_CLOSE_EVENT_CODES[code]);
  }

  private _onMessage(data: Payload) {
    data = JSON.parse(String(data));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, s, op, d } = data;
    if (s) this.seq = s;

    switch (op) {
      case GATEWAY_OPCODES.DISPATCH:
        // if (EVENTS[t]) client.emit(EVENTS[t], d);
        this.sessionID = d.sessionID;
        break;

      case GATEWAY_OPCODES.HEARTBEAT:
        this._heartbeat(false);
        break;

      case GATEWAY_OPCODES.RECONNECT:
        this._terminate();
        this.connect();
        this._resume();
        break;

      case GATEWAY_OPCODES.INVALID_SESSION:
        setTimeout(() => {
          this._identify();
        }, 4000);
        break;

      case GATEWAY_OPCODES.HELLO:
        this.heartBeatInterval = setInterval(() => this._heartbeat(true), d.heartbeat_interval);
        break;

      case GATEWAY_OPCODES.HEARTBEAT_ACK:
        this.lastHeartbeatAck = true;
        break;

      default:
        break;
    }
  }

  private _resume() {
    this._sendWS(GATEWAY_OPCODES.RESUME, {
      token: this._token,
      sessionID: this.sessionID,
      seq: this.seq,
    });
  }

  private _sendWS(op: GATEWAY_OPCODES, data: any) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        op,
        d: data,
      }));
    }
  }

  private _terminate() {
    clearInterval(this.heartBeatInterval);
    this.ws.off('close', this._onClose);
    this.ws.terminate();
  }
}
