/* eslint-disable @typescript-eslint/member-ordering */

import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Payload } from './constants';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from '../util/Constants';

export default class Socket {
  private _intents: number;
  private _token: string;
  private _wsURL: string;
  private interval!: NodeJS.Timeout;
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

  heartbeat(expected: boolean) {
    if (expected) {
      if (!this.lastHeartbeatAck) {
        clearInterval(this.interval);
        this.ws.removeEventListener('close');
        this.ws.terminate();

        this.newWS();
        this.resume();
        this.lastHeartbeatAck = true;
      } else this.lastHeartbeatAck = false;
    }
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        op: GATEWAY_OPCODES.HEARTBEAT,
        d: this.seq || null,
      }));
    }
  }

  identify() {
    this.ws.send(JSON.stringify({
      op: GATEWAY_OPCODES.IDENTIFY,
      d: {
        token: this._token,
        intents: this._intents,
        properties: {
          $os: process.platform,
          $browser: 'Dis.ts',
          $device: 'Dis.ts',
        },
      },
    }));
  }

  resume() {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        op: GATEWAY_OPCODES.RESUME,
        d: {
          token: this._token,
          session_id: this.session_id,
          seq: this.seq,
        },
      }));
    }
  }

  onMessage(data: Payload) {
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
        clearInterval(this.interval);
        this.ws.removeEventListener('close');
        this.ws.terminate();

        this.newWS();
        this.resume();
        break;

      case GATEWAY_OPCODES.INVALID_SESSION:
        setTimeout(() => {
          this.identify();
        }, 4000);
        break;

      case GATEWAY_OPCODES.HELLO:
        this.interval = setInterval(() => this.heartbeat(true), d.heartbeat_interval);
        break;

      case GATEWAY_OPCODES.HEARTBEAT_ACK:
        this.lastHeartbeatAck = true;
        break;

      default:
        break;
    }
  }

  onClose(code: number) {
    if (!GATEWAY_CLOSE_EVENT_CODES[code]) console.log(code);
    else console.log(GATEWAY_CLOSE_EVENT_CODES[code]);
  }

  newWS() {
    this.ws = new WebSocket(this._wsURL);
    this.ws.on('open', this.identify);
    this.ws.on('close', this.onClose);
    this.ws.on('message', this.onMessage);
  }
}
