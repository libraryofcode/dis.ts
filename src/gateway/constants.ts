export const GATEWAY_URL = 'wss://gateway.discord.gg/?v=8&encoding=json';

// https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties
export const GATEWAY_PROPERTIES = {
  $os: 'linux',
  $browser: 'DiscordTS',
  $device: 'DiscordTS',

};

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
export enum GATEWAY_OPCODES {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11
}

// https:// discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
export enum GATEWAY_CLOSE_CODES {
  'UNKNOWN_ERROR' = 4000,
  'UNKNOW_OPCODE' = 4001,
  'DECODE_ERROR' = 4002,
  'NOT_AUTHENTICATED' = 4003,
  'AUTHENTICATION_FAILED'= 4004,
  'ALREADY_AUTHENTICATED' = 4005,
  'INVALID_RESUME_SEQUENCE' = 4007,
  'RATE_LIMITED' = 4008,
  'SESSION_TIMED_OUT' = 4009,
  'INVALID_SHARD' = 4010,
  'SHARDING_REQUIRED' = 4011,
  'INVALID_API_VERSION' = 4012,
  'INVALID_INTENT(S)' = 4013,
  'DISALLOWED_INTENT(S)' = 4014,
}

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

// https://discord.com/developers/docs/topics/gateway#heartbeat
export const Heartbeat = {
  op: GATEWAY_OPCODES.HEARTBEAT,
  d: null,
};

// https://discord.com/developers/docs/topics/gateway#identify
export const Identify = {
  op: GATEWAY_OPCODES.IDENTIFY,
  d: {
    token: '',
    intents: 0,
    properties: {
      GATEWAY_PROPERTIES,
    },
  },
};

// https://discord.com/developers/docs/topics/gateway#payloads
export interface Payload {
  op: number;
  s: number;
  t: string;
  d: any;
}
