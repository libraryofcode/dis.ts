import Base from './Base';

export default interface Role extends Base {
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  name: string;
  permissions: string;
  position: number;
  tags?: roleTags;
}

export interface roleTags {
  bot_id?: string;
  integration_id?: string;
  premium_subscriber?: null;
}
