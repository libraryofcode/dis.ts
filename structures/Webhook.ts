import Base from './Base';
import { WebhookChannel } from './Channel';
import { WebhookGuild } from './Guild';

export default interface Webhook extends Base {
  application_id: string | null;
  avatar: string | null;
  channel_id: string | null;
  guild_id?: string | null;
  name: string | null;
  source_channel?: WebhookChannel;
  source_guild?: WebhookGuild;
  token?: string;
  type: WebhookType;
  url?: string;
  user?: unknown; // TODO User
}

export enum WebhookType {
  INCOMING = 1,
  CHANNEL_FOLLOWER,
  APPLICATION,
}
