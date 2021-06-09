import { Base } from '.';
import Activity, { ClientStatus, Status } from './Activity';
import Emoji, { PartialEmoji } from './Emoji';
import { UnavailableGuild } from './Guild';
import GuildIntegration from './GuildIntegration';
import GuildMember from './GuildMember';
import Invite from './Invite';
import Message from './Message';
import ApplicationCommand from './SlashCommands';

export default interface BotGateway {
  session_start_limit: {
    max_concurrency: number;
    remaining: number;
    reset_after: number;
    total: number;
  };
  shards: number;
  url: string;
}

export interface Gateway {
  url: string;
}

// REVIEW Should these be in their respective files?
// Connecting and Resuming
export interface Ready {
  application: unknown; // TODO PartialApplication
  guilds: UnavailableGuild;
  session_id: string;
  shard?: [number, number];
  user: unknown; // TODO User
  v: 8 | 9;
}

export interface Resumed {
  _trace: string[];
}

// Channels/Threads
export interface ChannelPinsUpdate {
  channel_id: string;
  guild_id?: string;
  last_pin_timestamp?: Date | null;
}

export interface ThreadDelete extends Base {
  guild_id: string;
  parent_id: string;
  type: unknown; // TODO Threads
}

export interface ThreadListSync {
  channel_ids?: string[];
  guild_id: string;
  threads: unknown; // TODO Thread channel
}

export interface ThreadMembersUpdate extends Base {
  added_members?: unknown[]; // TODO Threads
  guild_id: string;
  member_count: number;
  removed_member_ids?: string[];
}

// Guilds
export interface GuildBan {
  guild_id: string;
  user: unknown; // TODO User
}

export interface GuildEmojisUpdate {
  emojis: Emoji[];
  guild_id: string;
}

export interface GuildIntegrationsUpdate {
  guild_id: string;
}

export interface GuildMemberAdd extends GuildMember {
  guild_id: string;
}

export interface GuildMemberRemove {
  guild_id: string;
  user: unknown; // TODO User
}

export interface GuildMemberUpdate extends Omit<GuildMember, 'user' | 'joined_at' | 'premium_since' | 'deaf' | 'mute'> {
  deaf?: boolean;
  guild_id: string;
  joined_at: Date | null;
  mute?: boolean;
  premium_since?: Date | null;
  user: unknown; // TODO User;
}

export interface GuildMembersChunk {
  chunk_count: number;
  chunk_index: number;
  guild_id: string;
  members: GuildMember[];
  nonce?: string;
  not_found?: string[];
  presences?: unknown; // TODO Presence
}

export interface GuildRole { // REVIEW This needs a new name due to role conflict
  guild_id: string;
  role: unknown; // TODO Role
}

export interface GuildRoleDelete {
  guild_id: string;
  role_id: string;
}

// Integrations
export interface Integration extends GuildIntegration {
  guild_id: string;
}

export interface IntegrationDelete extends Base {
  application_id?: string;
  guild_id: string;
}

// Invites
export interface InviteCreate extends Omit<Invite, 'approximate_member_count' | 'approximate_presence_count' | 'channel' | 'expires_at' | 'guild'> {
  channel_id: string;
  guild_id?: string;
}

export interface InviteDelete {
  channel_id: string;
  code: string;
  guild_id?: string;
}

// Messages
export interface MessageUpdate extends Partial<Message> {
  channel_id: string;
  id: string;
}

export interface MessageDelete {
  channel_id: string;
  guild_id?: string;
  id: string;
}

export interface MessageDeleteBulk {
  channel_id: string;
  guild_id?: string;
  ids: string[];
}

export interface MessageReactionAdd {
  channel_id: string;
  emoji: PartialEmoji;
  guild_id?: string;
  member?: GuildMember;
  message_id: string;
  user_id: string;
}

export interface MessageReactionRemove {
  channel_id: string;
  emoji: PartialEmoji;
  guild_id?: string;
  message_id: string;
  user_id: string;
}

export interface MessageReactionRemoveAll {
  channel_id: string;
  guild_id?: string;
  message_id: string;
}

export interface MessageReactionRemoveEmoji {
  channel_id: string;
  emoji: PartialEmoji;
  guild_id?: string;
  message_id: string;
}

// Presence
export interface PresenceUpdate {
  activities?: Activity[];
  client_status?: ClientStatus;
  guild_id?: string;
  status?: Status | 'offline';
  user?: unknown; // Partial<User> with guaranteed `id`
}

export interface TypingStart {
  channel_id: string;
  guild_id?: string;
  member?: GuildMember;
  timestamp: number;
  user_id: string;
}

// Voice
export interface VoiceServerUpdate {
  endpoint: string | null;
  guild_id: string;
  token: string;
}

// Webhooks
export interface WebhooksUpdate {
  channel_id: string;
  guild_id: string;
}

// Commands
export interface SlashCommand extends ApplicationCommand {
  guild_id?: string;
}
