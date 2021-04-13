import DiscordWebsocket from '../../ws/DiscordWebsocket';
import Collection from '../util/Collection';

export default class ShardManager {
  shards: Collection<DiscordWebsocket>;

  private shardID: number;

  constructor() {
    this.shards = new Collection({ base: DiscordWebsocket });
    this.shardID = 0;
  }

  connect(websocket: DiscordWebsocket) {
    websocket.connect();

    this.shards.set((this.shardID++).toString(), websocket);
  }
}
