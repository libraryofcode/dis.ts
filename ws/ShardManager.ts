import BotGateway from '../structures/BotGateway';
import DiscordWebsocket, { ConnectionProperties } from './DiscordWebsocket';
import fetch from 'node-fetch';
import { INTENTS } from './constants';

export default class ShardManager {
  botGatewayURL: string;
  connProps: Partial<ConnectionProperties>;
  intents: INTENTS;
  shards: Map<number, DiscordWebsocket> = new Map();
  token: string;

  constructor(token: string, intents: number, connProps: Partial<ConnectionProperties> = {}, botGatewayURL = 'https://discord.com/api/v8/gateway/bot') {
    this.token = token;
    this.intents = intents;
    this.connProps = connProps;
    this.botGatewayURL = botGatewayURL;
    this.initialize();
  }

  private getBotGateway(): Promise<BotGateway> {
    return fetch(this.botGatewayURL).then((r) => r.json());
  }

  private async initialize() {
    const botGateway = await this.getBotGateway();

    for (let currentShard = 0; currentShard <= botGateway.shards; currentShard++) {
      const websocket = new DiscordWebsocket(this.token, botGateway.url, this.intents, this.connProps);
      this.shards.set(currentShard, websocket);
      websocket.connect();
    }
  }
}
