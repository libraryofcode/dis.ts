import { EventEmitter } from 'events';
import { Channel, Message, ThreadMember, VoiceState } from '../structures';
import { ChannelPinsUpdate, GuildBan, GuildEmojisUpdate, GuildIntegrationsUpdate, GuildMemberAdd, GuildMemberRemove, GuildMembersChunk, GuildMemberUpdate, GuildRole, GuildRoleDelete, Integration, IntegrationDelete, InviteCreate, InviteDelete, MessageDelete, MessageDeleteBulk, MessageReactionAdd, MessageReactionRemove, MessageReactionRemoveAll, MessageReactionRemoveEmoji, PresenceUpdate, Ready, Resumed, SlashCommand, ThreadListSync, ThreadMembersUpdate, TypingStart, VoiceServerUpdate, WebhooksUpdate } from '../structures/Gateway';
import Guild, { UnavailableGuild } from '../structures/Guild';
import Interaction from '../structures/Interaction';
import StageInstance from '../structures/StageInstance';
import { INTENTS, Payload } from './constants';
import { ConnectionProperties } from './DiscordWebsocket';
import ShardManager from './ShardManager';

class GatewayClient extends EventEmitter {
  options: GatewayOptions;
  shardManager: ShardManager;
  constructor(token: string, options: GatewayOptions, gwURL?: string) {
    super();
    this.options = options;
    this.shardManager = new ShardManager(this, token, gwURL);
  }

  connect() {
    return this.shardManager.initialize();
  }
}

interface GatewayClient extends EventEmitter {
  on: GatewayEvents<this>;
}

export default GatewayClient;

export type GatewayEvents<T> = ((event: 'rawMessage', listener: (id: number, payload: Payload) => void) => T)
// Connecting and Resuming
| ((event: 'READY', listener: (id: number, data: Ready) => void) => T)
| ((event: 'RESUMED', listener: (id: number, data: Resumed) => void) => T)
// Channels
| ((event: `CHANNEL_${'CREATE' | 'UPDATE' | 'DELETE'}` | `THREAD_${'CREATE' | 'UPDATE' | 'DELETE'}`, listener: (id: number, data: Channel) => void) => T)
| ((event: 'THREAD_LIST_SYNC', listener: (id: number, data: ThreadListSync) => void) => T)
| ((event: 'THREAD_MEMBER_UPDATE', listener: (id: number, data: ThreadMember) => void) => T)
| ((event: 'THREAD_MEMBERS_UPDATE', listener: (id: number, data: ThreadMembersUpdate) => void) => T)
| ((event: 'CHANNEL_PINS_UPDATE', listener: (id: number, data: ChannelPinsUpdate) => void) => T)
// Guilds
| ((event: `GUILD_${'CREATE' | 'UPDATE'}`, listener: (id: number, data: Guild) => void) => T)
| ((event: 'GUILD_DELETE', listener: (id: number, data: UnavailableGuild) => void) => T)
| ((event: `GUILD_BAN_${'ADD' | 'REMOVE'}`, listener: (id: number, data: GuildBan) => void) => T)
| ((event: 'GUILD_EMOJIS_UPDATE', listener: (id: number, data: GuildEmojisUpdate) => void) => T)
| ((event: 'GUILD_INTEGRATIONS_UPDATE', listener: (id: number, data: GuildIntegrationsUpdate) => void) => T)
| ((event: 'GUILD_MEMBER_ADD', listener: (id: number, data: GuildMemberAdd) => void) => T)
| ((event: 'GUILD_MEMBER_REMOVE', listener: (id: number, data: GuildMemberRemove) => void) => T)
| ((event: 'GUILD_MEMBER_UPDATE', listener: (id: number, data: GuildMemberUpdate) => void) => T)
| ((event: 'GUILD_MEMBERS_CHUNK', listener: (id: number, data: GuildMembersChunk) => void) => T)
| ((event: `GUILD_ROLE_${'CREATE' | 'UPDATE'}`, listener: (id: number, data: GuildRole) => void) => T)
| ((event: 'GUILD_ROLE_DELETE', listener: (id: number, data: GuildRoleDelete) => void) => T)
// Integrations
| ((event: `INTEGRATION_${'CREATE' | 'UPDATE'}`, listener: (id: number, data: Integration) => void) => T)
| ((event: 'INTEGRATION_DELETE', listener: (id: number, data: IntegrationDelete) => void) => T)
// Invites
| ((event: 'INVITE_CREATE', listener: (id: number, data: InviteCreate) => void) => T)
| ((event: 'INVITE_DELETE', listener: (id: number, data: InviteDelete) => void) => T)
// Messages
| ((event: `MESSAGE_${'CREATE' | 'UPDATE'}`, listener: (id: number, data: Message) => void) => T)
| ((event: 'MESSAGE_DEELTE', listener: (id: number, data: MessageDelete) => void) => T)
| ((event: 'MESSAGE_DELETE_BULK', listener: (id: number, data: MessageDeleteBulk) => void) => T)
| ((event: 'MESSAGE_REACTION_ADD', listener: (id: number, data: MessageReactionAdd) => void) => T)
| ((event: 'MESSAGE_REACTION_REMOVE', listener: (id: number, data: MessageReactionRemove) => void) => T)
| ((event: 'MESSAGE_REACTION_REMOVE_ALL', listener: (id: number, data: MessageReactionRemoveAll) => void) => T)
| ((event: 'MESSAGE_REACTION_REMOVE_EMOJI', listener: (id: number, data: MessageReactionRemoveEmoji) => void) => T)
// Presence
| ((event: 'PRESENCE_UPDATE', listener: (id: number, data: PresenceUpdate) => void) => T)
| ((event: 'TYPING_START', listener: (id: number, data: TypingStart) => void) => T)
| ((event: 'USER_UPDATE', listener: (id: number, data: unknown) => void) => T) // TODO User
// Voice
| ((event: 'VOICE_STATE_UPDATE', listener: (id: number, data: VoiceState) => void) => T)
| ((event: 'VOICE_SERVER_UPDATE', listener: (id: number, data: VoiceServerUpdate) => void) => T)
// Webhooks
| ((event: 'WEBHOOKS_UPDATE', listener: (id: number, data: WebhooksUpdate) => void) => T)
// Commands
| ((event: `APPLICATION_COMMAND_${'CREATE' | 'UPDATE' | 'DELETE'}`, listener: (id: number, data: SlashCommand) => void) => T)
// Interactions
| ((event: 'INTERACTION_CREATE', listener: (id: number, data: Interaction) => void) => T)
// Stage Instances
| ((event: `STAGE_INSTANCE_${'CREATE' | 'UPDATE' | 'DELETE'}`, listener: (id: number, data: StageInstance) => void) => T);

export interface GatewayOptions {
  connProps?: ConnectionProperties;
  intents: INTENTS;
  shards?: {
    firstShard?: number;
    lastShard?: number;
    recommended?: boolean;
  };
}
