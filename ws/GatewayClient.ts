import { EventEmitter } from 'events';
import { INTENTS } from './constants';
import { ConnectionProperties } from './DiscordWebsocket';
import ShardManager from './ShardManager';

export interface GatewayOptions {
  connProps?: ConnectionProperties;
  intents: INTENTS;
  shards?: {
    firstShard?: number;
    lastShard?: number;
    recommended?: boolean;
  };
}

export default class GatewayClient extends EventEmitter {
  options: GatewayOptions;
  shardManager: ShardManager;
  constructor(token: string, options: GatewayOptions, gwURL?: string) {
    super();
    this.options = options;
    this.shardManager = new ShardManager(this, token, gwURL);
  }

  connect() {
    return this.shardManager.initialize();
  }
}
