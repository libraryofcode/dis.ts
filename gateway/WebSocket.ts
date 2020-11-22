/* eslint-disable no-case-declarations */
import WebSocket from 'ws';
import { GATEWAY_URL, GATEWAY_OPCODES, GATEWAY_CLOSE_CODES, EVENTS, Heartbeat, Identify, Payload } from './constants';
import { client } from '../Client';

const ws = new WebSocket(GATEWAY_URL);

function heartbeat(ms: number) {
  setInterval(() => {
    ws.send(JSON.stringify(Heartbeat));
  }, ms);
}

function identify(token: string, intents: number) {
  Identify.d.token = token;
  Identify.d.intents = intents;
  ws.send(JSON.stringify(Identify));
}

ws.on('open', () => {
  identify('<token>' /* intents number. you can try 512 (GUILD_MESSAGES) */);
});

ws.on('message', (data: Payload) => {
  data = JSON.parse(String(data));
  const { t, s, op, d } = data;

  switch (op) {
    case GATEWAY_OPCODES.DISPATCH:
      if (EVENTS[t]) client.emit(EVENTS[t], d);
      break;

    case GATEWAY_OPCODES.HEARTBEAT:
      break;

    case GATEWAY_OPCODES.IDENTIFY:
      break;

    case GATEWAY_OPCODES.PRESENCE_UPDATE:
      break;

    case GATEWAY_OPCODES.VOICE_STATE_UPDATE:
      break;

    case GATEWAY_OPCODES.RESUME:
      break;

    case GATEWAY_OPCODES.RECONNECT:
      break;

    case GATEWAY_OPCODES.REQUEST_GUILD_MEMBERS:
      break;

    case GATEWAY_OPCODES.INVALID_SESSION:
      break;

    case GATEWAY_OPCODES.HELLO:
      const { heartbeat_interval } = d;
      heartbeat(heartbeat_interval);
      break;

    case GATEWAY_OPCODES.HEARTBEAT_ACK:
      break;

    default:
      break;
  }
});

ws.on('close', (code) => {
  // eslint-disable-next-line no-console
  console.log(GATEWAY_CLOSE_CODES[code]);
  process.exit();
});
