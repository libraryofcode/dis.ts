import BotGateway, { Gateway } from '../structures/Gateway';
import DiscordWebsocket from './DiscordWebsocket';
import GatewayClient, { GatewayOptions } from './GatewayClient';

export default class ShardManager {
  client: GatewayClient;
  gwURL: string;
  options: Required<GatewayOptions>;
  shards: Map<number, DiscordWebsocket> = new Map();
  token: string;

  constructor(client: GatewayClient, token: string, gwURL?: string) {
    this.client = client;
    this.options = {
      ...client.options,
      shards: {
        firstShard: 0,
        recommended: false,
        ...client.options.shards,
      },
      connProps: {
        $os: process.platform,
        $browser: 'dis.ts',
        $device: 'dis.ts',
        ...client.options.connProps,
      },
    };
    this.token = token;
    this.gwURL = gwURL || '';
    this.initialize();
  }

  async getBotGateway(restClient?: any): Promise<BotGateway> {
    // @ts-ignore: Dynamic import of module
    if (!restClient || !(restClient instanceof (await import('@dis.ts/rest').catch(() => ({}))).default)) throw new Error('Missing or invalid RESTClient');
    return restClient.request('GET', '/gateway/bot', true);
  }

  async getGateway(restClient?: any): Promise<Gateway> {
    // @ts-ignore: Dynamic import of module
    if (!restClient || !(restClient instanceof (await import('@dis.ts/rest').catch(() => ({}))).default)) throw new Error('Missing or invalid RESTClient');
    return restClient.request('GET', '/gateway', false);
  }

  async initialize(restClient?: any) {
    if (<number> this.options.shards.firstShard < 0) throw new RangeError('Invalid first shard ID');

    if (this.options.shards.recommended) {
      const data = await this.getBotGateway(restClient);
      this.gwURL = data.url;
      if (this.options.shards.lastShard === undefined) this.options.shards.lastShard = data.shards - 1;
    } else if (!this.gwURL) {
      const data = await this.getGateway(restClient);
      this.gwURL = data.url;
    }

    if (this.options.shards.lastShard === undefined) this.options.shards.lastShard = this.options.shards.firstShard;
    else if (this.options.shards.lastShard < <number> this.options.shards.firstShard) throw new RangeError('Invalid last shard ID');

    for (let currentShard = <number> this.options.shards.firstShard; currentShard <= <number> this.options.shards.lastShard; currentShard++) {
      const websocket = new DiscordWebsocket(this, currentShard, this.gwURL);
      this.shards.set(currentShard, websocket);
      websocket.connect();
    }
  }
}
