export default interface GuildMember {
  deaf: boolean;
  joined_at: Date;
  mute: boolean;
  nick?: string | null;
  pending?: boolean;
  permissions?: unknown; // TODO BigInt permissions;
  premium_since: Date | null;
  roles: string[];
  user?: unknown; // TODO User;
}

export type GuildMemberMessage = Required<Omit<GuildMember, 'permissions' | 'user'>>;
