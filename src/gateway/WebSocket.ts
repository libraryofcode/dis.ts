/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Payload } from './constants';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from '../util/Constants';

export default function Socket(token: string, wsURL: string, intents: number) {
  let ws = new WebSocket(wsURL);
  let lastHeartbeatAck = true;
  let session_id: string;
  let seq: number;
  let interval: NodeJS.Timeout;

  function heartbeat(expected: boolean) {
    if (expected) {
      if (!lastHeartbeatAck) {
        clearInterval(interval);
        ws.removeEventListener('close');
        ws.terminate();
        newWS();
        resume();
        lastHeartbeatAck = true;
      } else lastHeartbeatAck = false;
    }
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({
        op: GATEWAY_OPCODES.HEARTBEAT,
        d: seq || null,
      }));
    }
  }

  function identify() {
    ws.send(JSON.stringify({
      op: GATEWAY_OPCODES.IDENTIFY,
      d: {
        token,
        intents,
        properties: {
          $os: process.platform,
          $browser: 'Dis.ts',
          $device: 'Dis.ts',
        },
      },
    }));
  }

  function resume() {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({
        op: GATEWAY_OPCODES.RESUME,
        d: {
          token,
          session_id,
          seq,
        },
      }));
    }
  }

  function onMessage(data: Payload) {
    data = JSON.parse(String(data));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, s, op, d } = data;
    if (s) seq = s;

    switch (op) {
      case GATEWAY_OPCODES.DISPATCH:
      // if (EVENTS[t]) client.emit(EVENTS[t], d);
        session_id = d.session_id;
        break;

      case GATEWAY_OPCODES.HEARTBEAT:
        heartbeat(false);
        break;

      case GATEWAY_OPCODES.RECONNECT:
        clearInterval(interval);
        ws.removeEventListener('close');
        ws.terminate();
        newWS();
        resume();
        break;

      case GATEWAY_OPCODES.INVALID_SESSION:
        setTimeout(() => {
          identify();
        }, 4000);
        break;

      case GATEWAY_OPCODES.HELLO:
        interval = setInterval(() => heartbeat(true), d.heartbeat_interval);
        break;

      case GATEWAY_OPCODES.HEARTBEAT_ACK:
        lastHeartbeatAck = true;
        break;

      default:
        break;
    }
  }

  function onClose(code: number) {
    if (!GATEWAY_CLOSE_EVENT_CODES[code]) console.log(code);
    else console.log(GATEWAY_CLOSE_EVENT_CODES[code]);
  }

  function newWS() {
    ws = new WebSocket(wsURL);
    ws.on('open', identify);
    ws.on('close', onClose);
    ws.on('message', onMessage);
  }
  newWS();
}
