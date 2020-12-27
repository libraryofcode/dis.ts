import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Payload } from './constants';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from '../util/Constants';

export default class Socket {
  private _intents: number;
  private _token: string;
  private _wsURL: string;
  private heartBeatInterval!: NodeJS.Timeout;
  private lastHeartbeatAck = true;
  private seq!: number;
  private session_id!: string;
  private ws!: WebSocket;

  constructor(token: string, wsURL: string, intents: number) {
    this._token = token;
    this._wsURL = wsURL;
    this._intents = intents;

    this.identify = this.identify.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  initialize() {
    this.ws = new WebSocket(this._wsURL);
    this.ws.on('open', this.identify);
    this.ws.on('close', this.onClose);
    this.ws.on('message', this.onMessage);
  }

  private heartbeat(expected: boolean) {
    if (expected) {
      if (!this.lastHeartbeatAck) {
        this.terminate();
        this.initialize();
        this.resume();
        this.lastHeartbeatAck = true;
      } else {
        this.lastHeartbeatAck = false;
      }
    }
    this.sendWS(GATEWAY_OPCODES.HEARTBEAT, this.seq || null);
  }

  private identify() {
    this.sendWS(GATEWAY_OPCODES.IDENTIFY, {
      token: this._token,
      intents: this._intents,
      properties: {
        $os: process.platform,
        $browser: 'Dis.ts',
        $device: 'Dis.ts',
      },
    });
  }

  private onClose(code: number) {
    if (!GATEWAY_CLOSE_EVENT_CODES[code]) console.log(code);
    else console.log(GATEWAY_CLOSE_EVENT_CODES[code]);
  }

  private onMessage(data: Payload) {
    data = JSON.parse(String(data));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, s, op, d } = data;
    if (s) this.seq = s;

    switch (op) {
      case GATEWAY_OPCODES.DISPATCH:
        // if (EVENTS[t]) client.emit(EVENTS[t], d);
        this.session_id = d.session_id;
        break;

      case GATEWAY_OPCODES.HEARTBEAT:
        this.heartbeat(false);
        break;

      case GATEWAY_OPCODES.RECONNECT:
        this.terminate();
        this.initialize();
        this.resume();
        break;

      case GATEWAY_OPCODES.INVALID_SESSION:
        setTimeout(() => {
          this.identify();
        }, 4000);
        break;

      case GATEWAY_OPCODES.HELLO:
        this.heartBeatInterval = setInterval(() => this.heartbeat(true), d.heartbeat_interval);
        break;

      case GATEWAY_OPCODES.HEARTBEAT_ACK:
        this.lastHeartbeatAck = true;
        break;

      default:
        break;
    }
  }

  private resume() {
    this.sendWS(GATEWAY_OPCODES.RESUME, {
      token: this._token,
      session_id: this.session_id,
      seq: this.seq,
    });
  }

  private sendWS(op: GATEWAY_OPCODES, data: any) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        op,
        d: data,
      }));
    }
  }

  private terminate() {
    clearInterval(this.heartBeatInterval);
    this.ws.off('close', this.onClose);
    this.ws.terminate();
  }
}
