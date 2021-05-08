import { ChannelPartial } from './Channel';
import { GuildPartial } from './Guild';

export default interface Invite {
  approximate_member_count?: number;
  approximate_presence_count?: number;
  channel: ChannelPartial;
  code: string;
  expires_at?: Date | null;
  guild?: GuildPartial;
  inviter?: unknown; // TODO User
  target_application?: unknown; // TODO Partial OAuth Application
  target_type?: InviteTargetType;
  target_user?: unknown; // TODO User
}

export interface InviteMetadata extends Invite {
  created_at: Date;
  max_age: number;
  max_uses: number;
  temporary: boolean;
  uses: number;
}

export enum InviteTargetType {
  STREAM = 1,
  EMBEDDED_APPLICATION,
}
