import Base from './Base';
import GuildIntegration from './GuildIntegration';

export default interface UserConnection extends Base {
  friend_sync: boolean;
  integrations?: GuildIntegration[]; // TODO Partial but undocumented what exactly?
  name: string;
  revoked?: boolean;
  show_activity: boolean;
  type: 'twitch' | 'youtube';
  verified: boolean;
  visibility: ConnectionVisibilityType;
}

export enum ConnectionVisibilityType {
  NONE,
  EVERYONE,
}
