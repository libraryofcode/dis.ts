/* eslint-disable no-case-declarations */
import WebSocket from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EVENTS, Heartbeat, Payload } from './constants';
import { GATEWAY_OPCODES, GATEWAY_CLOSE_EVENT_CODES } from '../util/Constants';

export default async function Socket(token: string, wsURL: string, intents: number) {
  const ws = new WebSocket(wsURL);

  function heartbeat(ms: number) {
    setInterval(() => {
      ws.send(JSON.stringify(Heartbeat));
    }, ms);
  }

  function identify() {
    ws.send(JSON.stringify({
      op: GATEWAY_OPCODES.IDENTIFY,
      d: {
        token,
        intents,
        properties: {
          $os: process.platform,
          $browser: 'DiscordTS',
          $device: 'DiscordTS',
        },
      },
    }));
  }

  ws.on('open', () => {
    identify();
  });

  ws.on('message', (data: Payload) => {
    data = JSON.parse(String(data));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, s, op, d } = data;

    switch (op) {
      case GATEWAY_OPCODES.DISPATCH:
        // if (EVENTS[t]) client.emit(EVENTS[t], d);
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
    console.log(GATEWAY_CLOSE_EVENT_CODES[code]);
    process.exit();
  });
}
