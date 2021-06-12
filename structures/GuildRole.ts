import Base from './Base';
import Permissions from './Permissions';

export default interface GuildRole extends Base {
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  name: string;
  permissions: Permissions;
  position: number;
  tags?: RoleTags;
}

export interface RoleTags {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
}
