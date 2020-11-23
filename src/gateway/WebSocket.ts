/* eslint-disable no-case-declarations */
import WebSocket from 'ws';
import fetch from 'node-fetch';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_CODES, EVENTS, Heartbeat, Identify, Payload } from './constants';
import { client } from '../Client';

export default async function Socket(token: string, intents: number) {
  const res = await fetch('https://discord.com/api/v8/gateway/bot', {
    headers: {
      Authorization: `Bot ${token}`,
    },
  });
  const json = await res.json();

  const ws = new WebSocket(json.url);

  function heartbeat(ms: number) {
    setInterval(() => {
      ws.send(JSON.stringify(Heartbeat));
    }, ms);
  }

  function identify(token2: string, intents2: number) {
    Identify.d.token = token2;
    Identify.d.intents = intents2;
    ws.send(JSON.stringify(Identify));
  }

  ws.on('open', () => {
    identify(token, intents);
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
}
