import DiscordWebsocket, { ConnectionProperties } from './DiscordWebsocket';

interface BotGateway {
  session_start_limit: {
    max_concurrency: number;
    remaining: number;
    reset_after: number;
    total: number;
  };
  shards: number;
  url: string;
}

export default class ShardManager {
  private shards: Map<number, DiscordWebsocket> = new Map();

  constructor(private token: string, private intents: number, private connProps: Partial<ConnectionProperties> = {}) {
    this.initialize();
  }

  private async getBotGateway() {
    const botGateway: BotGateway = await (await fetch('https://discord.com/api/v8/gateway/bot')).json();
    return botGateway;
  }

  private async initialize() {
    const botGateway = await this.getBotGateway();

    for (let currentShard = 0; currentShard <= botGateway.shards; currentShard++) {
      const websocket = new DiscordWebsocket(this.token, botGateway.url, this.intents, this.connProps);
      websocket.connect();
      this.shards.set(currentShard, websocket);
    }
  }
}
