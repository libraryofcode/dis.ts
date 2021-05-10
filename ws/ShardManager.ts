import BotGateway from '../structures/BotGateway';
import DiscordWebsocket, { ConnectionProperties } from './DiscordWebsocket';

export default class ShardManager {
  shards: Map<number, DiscordWebsocket> = new Map();

  constructor(public token: string, public intents: number, public connProps: Partial<ConnectionProperties> = {}, public botGatewayURL: string = 'https://discord.com/api/v8/gateway/bot') {
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
