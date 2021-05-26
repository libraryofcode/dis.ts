import BotGateway from '../structures/BotGateway';
import DiscordWebsocket from './DiscordWebsocket';
import fetch from 'node-fetch';
import GatewayClient, { GatewayOptions } from './GatewayClient';

export default class ShardManager {
  botGatewayURL = 'https://discord.com/api/v8/gateway/bot';
  client: GatewayClient;
  options: GatewayOptions;
  shards: Map<number, DiscordWebsocket> = new Map();
  token: string;

  constructor(client: GatewayClient, token: string) {
    this.client = client;
    this.options = client.options;
    this.token = token;
    this.initialize();
  }

  getBotGateway(): Promise<BotGateway> {
    return fetch(this.botGatewayURL).then((r) => r.json());
  }

  async initialize() {
    const botGateway = await this.getBotGateway();

    for (let currentShard = 0; currentShard <= botGateway.shards; currentShard++) {
      const websocket = new DiscordWebsocket(this, botGateway.url);
      this.shards.set(currentShard, websocket);
      websocket.connect();
    }
  }
}
