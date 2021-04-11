// https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events
export const EVENTS = {
  READY: 'ready',
  CHANNEL_CREATE: 'channelCreate',
  CHANNEL_UPDATE: 'channelUpdate',
  CHANNEL_DELETE: 'channelDelete',
  CHANNEL_PINS_UPDATE: 'channelPinsUpdate',
  GUILD_CREATE: 'guildCreate',
  GUILD_UPDATE: 'guildUpdate',
  GUILD_DELETE: 'guildDelete',
  GUILD_BAN_ADD: 'guildBanAdd',
  GUILD_BAN_REMOVE: 'guildBanRemove',
  GUILD_EMOJIS_UPDATE: 'guildEmojiesUpdate',
  GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate',
  GUILD_MEMBER_ADD: 'guildMemberAdd',
  GUILD_MEMBER_REMOVE: 'guildMemberRemove',
  GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
  GUILD_MEMBERS_CHUNK: 'guildMembersChunk',
  GUILD_ROLE_CREATE: 'guildRoleCreate',
  GUILD_ROLE_UPDATE: 'guildRoleUpdate',
  GUILD_ROLE_DELETE: 'guildRoleDelete',
  INVITE_CREATE: 'inviteCreate',
  INVITE_DELETE: 'inviteDelete',
  MESSAGE_CREATE: 'messageCreate',
  MESSAGE_UPDATE: 'messageUpdate',
  MESSAGE_DELETE: 'messageDelete',
  MESSAGE_DELETE_BULK: 'messageDeleteBulk',
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
  MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll',
  MESSAGE_REACTION_REMOVE_EMOJI: 'messageReactionRemoveEmoji',
  PRESENCE_UPDATE: 'presenceUpdate',
  TYPING_START: 'typingStart',
  USER_UPDATE: 'userUpdate',
  VOICE_STATE_UPDATE: 'voiceStateUpdate',
  VOICE_SERVER_UPDATE: 'guildServerUpdate',
  WEBHOOKS_UPDATE: 'webhooksUpdate',
};

// https://discord.com/developers/docs/topics/gateway#list-of-intents
export enum INTENTS {
  GUILDS = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_BANS = 1 << 2,
  GUILD_EMOJIS = 1 << 3,
  GUILD_INTEGRATIONS = 1 << 4,
  GUILD_WEBHOOKS = 1 << 5,
  GUILD_INVITES = 1 << 6,
  GUILD_VOICE_STATES = 1 << 7,
  GUILD_PRESENCES = 1 << 8,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  GUILD_MESSAGE_TYPING = 1 << 11,
  DIRECT_MESSAGES = 1 << 12,
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  DIRECT_MESSAGE_TYPING = 1 << 14,
}

// https://discord.com/developers/docs/topics/gateway#update-status-status-types
export enum STATUS_TYPES {
  ONLINE = 'online',
  DO_NOT_DISTURB = 'dnd',
  IDLE = 'idle',
  INVISIBLE = 'invisible',
  OFFLINE = 'offline',
}

// https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
export enum ACTIVITY_TYPES {
  PLAYING,
  STREAMING,
  LISTENING,
  WATCHING,
  CUSTOM,
  COMPETING,
}

// https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags
export enum ACTIVITY_FLAGS {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
export enum GATEWAY_OPCODES {
  DISPATCH,
  HEARTBEAT,
  IDENTIFY,
  PRESENCE_UPDATE,
  VOICE_STATE_UPDATE,
  VOICE_SERVER_PING,
  RESUME,
  RECONNECT,
  REQUEST_GUILD_MEMBERS,
  INVALID_SESSION,
  HELLO,
  HEARTBEAT_ACK,
  SYNC_GUILD,
  SYNC_CALL,
}

// https:// discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
export enum GATEWAY_CLOSE_EVENT_CODES {
  UNKNOWN_ERROR = 4000,
  UNKNOW_OPCODE,
  DECODE_ERROR,
  NOT_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ALREADY_AUTHENTICATED,
  INVALID_SESSION,
  INVALID_RESUME_SEQUENCE,
  RATE_LIMITED,
  SESSION_TIMEOUT,
  INVALID_SHARD,
  SHARDING_REQUIRED,
  INVALID_API_VERSION,
  INVALID_INTENTS,
  DISALLOWED_INTENTS,
}

// https://discord.com/developers/docs/topics/gateway#payloads
export interface Payload {
  d: any;
  op: GATEWAY_OPCODES;
  s: number;
  t: string;
}
