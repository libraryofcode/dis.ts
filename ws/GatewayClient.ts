import { EventEmitter } from 'events';
import { INTENTS } from './constants';
import { ConnectionProperties } from './DiscordWebsocket';
import ShardManager from './ShardManager';

export interface GatewayOptions {
  connProps?: ConnectionProperties;
  gwURL?: string;
  intents: INTENTS;
}

export default class GatewayClient extends EventEmitter {
  options: GatewayOptions;
  shardManager: ShardManager;
  constructor(token: string, options: GatewayOptions) {
    super();
    this.options = options;
    this.shardManager = new ShardManager(this, token);
  }

  connect() {
    return this.shardManager.initialize();
  }
}
