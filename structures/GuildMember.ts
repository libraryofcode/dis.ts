import Permissions from './Permissions';

export default interface GuildMember {
  deaf: boolean;
  joined_at: Date;
  mute: boolean;
  nick?: string | null;
  pending?: boolean;
  permissions?: Permissions;
  premium_since?: Date | null;
  roles: string[];
  user?: unknown; // TODO User;
}
