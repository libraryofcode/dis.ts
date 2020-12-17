// Audit Log
// https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
export enum AUDIT_LOG_EVENTS {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  MEANING_OF_LIFE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82,
}

// Channel
// https://discord.com/developers/docs/resources/channel#channel-object-channel-types
export enum CHANNEL_TYPES {
  GUILD_TEXT,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_STORE,
}
export enum GUILD_TEXT_CHANNEL_TYPES {
  GUILD_TEXT,
  GUILD_NEWS = 5,
}

// https://discord.com/developers/docs/resources/channel#message-object-message-types
export enum MESSAGE_TYPES {
  DEFAULT,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
  GUILD_STREAM,
  GUILD_DISCOVERY_DISQUALIFIED,
  GUILD_DISCOVERY_REQUALIFIED,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
  THREAD_START,
  REPLY,
}

// https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
export enum MESSAGE_ACTIVITY_TYPES {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  // UNKNOWN 4
  JOIN_REQUEST = 5,
}

// https://discord.com/developers/docs/resources/channel#message-object-message-flags
export enum MESSAGE_FLAGS {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
}

// https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types
export enum MESSAGE_STICKER_FORMAT_TYPES {
  PNG = 1,
  APNG,
  LOTTIE,
}

// https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure
export enum OVERWRITE_TYPES {
  ROLE,
  MEMBER,
}

// Guild
// https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
export enum DEFAULT_MESSAGE_NOTIFICATION_LEVEL {
  ALL_MESSAGES,
  ONLY_MENTIONS,
}

// https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
export enum EXPLICIT_CONTENT_FILTER_LEVEL {
  DISABLED,
  MEMBERS_WITHOUT_ROLES,
  ALL_MEMBERS,
}

// https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
export enum MFA_LEVEL {
  NONE,
  ELEVATED,
}

// https://discord.com/developers/docs/resources/guild#guild-object-verification-level
export enum VERIFICATION_LEVEL {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

// https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
export enum PREMIUM_TIER {
  NONE,
  TIER_1,
  TIER_2,
  TIER_3,
}

// https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags
export enum SYSTEM_CHANNEL_FLAGS {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
}

// https://discord.com/developers/docs/resources/guild#guild-object-guild-features
export enum GUILD_FEATURES {
  INVITE_SPLASH = 'inviteSplash',
  VIP_REGIONS = 'vipRegions',
  VANITY_URL = 'vanityURL',
  VERIFIED = 'verified',
  PARTNERED = 'partnered',
  COMMUNITY = 'community',
  COMMERCE = 'commerce',
  NEWS = 'news',
  DISCOVERABLE = 'discoverable',
  FEATURABLE = 'featurable',
  ANIMATED_ICON = 'animatedIcon',
  BANNER = 'banner',
  WELCOME_SCREEN_ENABLED = 'welcomeScreenEnabled',
}

// https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors
export enum INTEGRATION_EXPIRE_BEHAVIORS {
  REMOVE_ROLE,
  KICK,
}

// https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options
export enum WIDGET_STYLE_OPTIONS {
  SHIELD = 'shield',
  BANNER1 = 'banner1',
  BANNER2 = 'banner2',
  BANNER3 = 'banner3',
  BANNER4 = 'banner4',
}

// Invite
// https://discord.com/developers/docs/resources/invite#invite-object-target-user-types
export enum TARGET_USER_TYPES {
  STREAM = 1,
}

// User
// https://discord.com/developers/docs/resources/user#user-object-user-flags
export enum USER_FLAGS {
  NONE,
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPESQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  MFA_SMS = 1 << 4,
  PREMIUM_PROMO_DISMISSED = 1 << 5,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  // UNKNOWN 1 << 11 discord/discord-api-docs#1823
  SYSTEM = 1 << 12,
  UNREAD_URGENT_MESSAGES = 1 << 13,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  UNDERAGE_DELETED = 1 << 15,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
}

// https://discord.com/developers/docs/resources/user#user-object-premium-types
export enum PREMIUM_TYPES {
  NONE,
  NITRO_CLASSIC,
  NITRO,
}

// https://discord.com/developers/docs/resources/user#connection-object-visibility-types
export enum VISIBILITY_TYPES {
  NONE,
  EVERYONE,
}

// Webhook
// https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types
export enum WEBHOOK_TYPES {
  INCOMING = 1,
  CHANNEL_FOLLOWER,
}

// Gateway
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

// Opcodes and Status Codes
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

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes
export enum VOICE_OPCODES {
  IDENTIFY,
  SELECT_PROTOCOL,
  READY,
  HEARTBEAT,
  SESSION_DESCRIPTION,
  SPEAKING,
  HEARTBEAT_ACK,
  RESUME,
  HELLO,
  RESUMED,
  SIGNAL,
  // UNKNOWN 11
  CLIENT_CONNECT = 12,
  CLIENT_DISCONNECT,
  SESSION_UPDATE,
  VIDEO_SINK_WANTS,
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes
export enum VOICE_CLOSE_EVENT_CODES {
  UNKNOWN_ERROR = 4000,
  UNKNOWN_OPCODE,
  DECODE_ERROR,
  NOT_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ALREADY_AUTHENTICATED,
  INVALID_SESSION,
  // UNKNOWN 4007-4008
  SESSION_TIMEOUT = 4009,
  // UNKNOWN 4010
  SERVER_NOT_FOUND = 4011,
  UNKNOWN_PROTOCOL,
  // UNKNOWN 4013
  DISCONNECTED = 4014,
  VOICE_SERVER_CRASHED,
  UNKNOWN_ENCRYPTION_MODE,
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes
export enum JSON_ERROR_CODES {
  GENERAL,
  UNKNOWN_ACCOUNT = 10001,
  UNKNOWN_APPLICATION,
  UNKNOWN_CHANNEL,
  UNKNOWN_GUILD,
  UNKNOWN_INTEGRATION,
  UNKNOWN_INVITE,
  UNKNOWN_MEMBER,
  UNKNOWN_MESSAGE,
  UNKNOWN_PERMISSION_OVERWRITE,
  UNKNOWN_PROVIDER,
  UNKNOWN_ROLE,
  UNKNOWN_TOKEN,
  UNKNOWN_USER,
  UNKNOWN_EMOJI,
  UNKNOWN_WEBHOOK,
  UNKNOWN_BAN,
  UNKNOWN_SKU,
  UNKNOWN_STORE_LISTING,
  UNKNOWN_ENTITLEMENT,
  UNKNOWN_BUILD,
  UNKNOWN_LOBBY,
  UNKNOWN_BRANCH,
  UNKNOWN_REDISTRIBUTABLE,
  UNKNOWN_GUILD_TEMPLATE,

  BOTS_DISALLOWED = 20001,
  BOTS_ONLY,
  RPC_PROXY_DISALLOWED,
  // UNKNWON 20004-20008
  EXPLICIT_CONTENT = 20009,
  // UNKNOWN 20010
  ACCOUNT_SCHEDULED_DELETE = 20011,
  USER_NOT_AUTHORIZED_APPLICATION,
  ACCOUNT_DISABLED,
  // UNKNOWN 20014-20015
  RATELIMIT_SLOWMODE = 20016,
  RATELIMIT_CHANNEL_FOLLOW_EDIT,
  // UNKNOWN 20018-20021
  RATELIMIT_ANNOUNCEMENT_EDIT = 20022,
  // UNKNOWN 20023
  UNDERAGE = 20024,
  // UNKNOWN 20025-20027
  RATELIMIT_CHANNEL_WRITE = 20028,

  MAX_GUILDS = 30001,
  MAX_FRIENDS,
  MAX_PINS,
  MAX_RECIPIENTS,
  MAX_ROLES,
  MAX_USERNAME_USAGE,
  MAX_WEBHOOKS,
  MAX_EMOJIS,
  // UNKNOWN 30009
  MAX_REACTIONS = 30010,
  // UNKNOWN 30011-30012
  MAX_CHANNELS = 30013,
  // UNKNOWN 30014
  MAX_ATTACHMENTS = 30015,
  MAX_INVITES,
  // UNKNOWN 30017
  MAX_ANIMATED_EMOJIS = 30018,
  // UNKNOWN 30019-30028
  NOT_ENOUGH_MEMBERS = 30029,
  // UNKNOWN 30030
  GUILD_TEMPLATE_EXISTS = 30031,

  UNAUTHORIZED = 40001,
  VERIFICATION_REQUIRED,
  RATELIMIT_OPEN_DM,
  SEND_MESSAGE_DISABLED,
  REQUEST_ENTITY_SIZE_EXCEEDED,
  FEATURE_DISABLED,
  USER_BANNED,
  // UNKNOWN 40008-40011
  CONNECTION_REVOKED = 40012,
  // UNKNOWN 40013-40027
  DELETE_ACCOUNT_TRANSFER_TEAM_OWNER = 40028,
  // UNKNOWN 40029-40032
  MESSAGE_ALREADY_CROSSPOSTED = 40033,

  MISSING_ACCESS = 50001,
  INVALID_ACCOUNT_TYPE,
  INVALID_ACTION_DM,
  INVALID_WIDGET_DISABLED,
  INVALID_AUTHOR_EDIT_MESSAGE,
  INVALID_EMPTY_MESSAGE,
  INVALID_AUTHOR_SEND_MESSAGE,
  INVALID_NON_TEXT_SEND_MESSAGE,
  INVALID_CHANNEL_VERIFICATION_TOO_HIGH,
  INVALID_OAUTH2_APPLICATION_NO_BOT,
  INVALID_OAUTH2_MAX_APPLICATIONS,
  INVALID_OAUTH2_STATE,
  INVALID_PERMISSIONS,
  INVALID_TOKEN,
  INVALID_NOTE_LENGTH_EXCEEDED,
  INVALID_BULK_DELETE_COUNT,
  INVALID_MFA_LEVEL,
  INVALID_PASSWORD,
  INVALID_CHANNEL_PIN_MESSAGE,
  INVALID_INVITE,
  INVALID_ACTION_SYSTEM_MESSAGE,
  INVALID_MOBILE_NUMBER,
  INVALID_CLIENT_ID,
  INVALID_ACTION_CHANNEL,
  INVALID_OAUTH2_ACCESS_TOKEN,
  INVALID_OAUTH2_MISSING_SCOPE,
  INVALID_WEBHOOK_TOKEN,
  // UNKNOWN 50028-50032
  INVALID_RECIPIENTS = 50033,
  INVALID_MESSAGE_BULK_DELETE_AGE,
  INVALID_FORM_BODY,
  INVALID_INVITE_BOT_GUILD,
  // UNKNOWN 50037-50040
  INVALID_API_VERSION = 50041,
  // UNKNOWN 50042-50049
  INVALID_GIFT_EXPIRED = 50050,
  INVALID_GIFT_CLAIMED,
  // UNKNOWN 50052-50053
  INVALID_GIFT_SELF_REDEEM = 50054,
  // UNKNOWN 50055-50073
  INVALID_CHANNEL_DELETE_COMMUNITY = 50074,
  // UNKNOWN 50075-50080,
  INVALID_STICKER_SENT = 50081,

  MFA_ENABLED = 60001,
  MFA_DISABLED,
  MFA_REQUIRED,
  MFA_VERIFICATION_REQUIRED,
  MFA_INVALID_SECRET,
  MFA_INVALID_TICKET,
  // UNKNOWN 60007
  MFA_INVALID_CODE = 60008,
  MFA_INVALID_SESSION,

  // UNKNOWN 70001-70002
  MOBILE_MESSAGE_SEND_FAILED = 70003,
  // UNKNOWN 70004-70006
  MOBILE_VERIFICATION_REQUIRED = 70007,

  RELATIONSHIP_INCOMING_DISABLED = 80000,
  RELATIONSHIP_INCOMING_BLOCKED,
  RELATIONSHIP_INVALID_USER_IS_BOT,
  RELATIONSHIP_INVALID_USER_IS_SELF,
  RELATIONSHIP_INVALID_DISCRIMINATOR,

  REACTION_BLOCKED = 90001,

  LISTING_ALREADY_JOINED = 120000,
  LISTING_MAX_MEMBERS,
  LISTING_JOIN_BLOCKED,

  RESOURCE_OVERLOAD = 130000,
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes
export enum RPC_ERROR_CODES {
  UNKNOWN_ERROR = 1000,
  INVALID_PAYLOAD = 4000,
  // UNKNOWN 4001
  INVALID_COMMAND = 4002,
  INVALID_GUILD,
  INVALID_EVENT,
  INVALID_CHANNEL,
  INVALID_PERMISSIONS,
  INVALID_CLIENT_ID,
  INVALID_ORIGIN,
  INVALID_TOKEN,
  INVALID_USER,

  OAUTH2_ERROR = 5000,
  SELECT_CHANNEL_TIMEOUT,
  GET_GUILD_TIMEOUT,
  VOICE_FORCE_REQUIRED,
  SHORTCUT_ALREADY_REGISTERED,
}

// https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes
export enum RPC_CLOSE_EVENT_CODES {
  INVALID_CLIENT_ID = 4000,
  INVALID_ORIGIN,
  RATELIMIT,
  TOKEN_REVOKED,
  INVALID_VERSION,
  INVALID_ENCODING,
}

// Permissions
// https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
export enum PERMISSION_FLAGS {
  CREATE_INSTANT_INVITE = 1 << 0,
  KICK_MEMBERS = 1 << 1,
  BAN_MEMBERS = 1 << 2,
  ADMINISTRATOR = 1 << 3,
  MANAGE_CHANNELS = 1 << 4,
  MANAGE_GUILD = 1 << 5,
  ADD_REACTIONS = 1 << 6,
  VIEW_AUDIT_LOG = 1 << 7,
  PRIORITY_SPEAKER = 1 << 8,
  STREAM = 1 << 9,
  VIEW_CHANNEL = 1 << 10,
  SEND_MESSAGES = 1 << 11,
  SEND_TTS_MESSAGES = 1 << 12,
  MANAGE_MESSAGES = 1 << 13,
  EMBED_LINKS = 1 << 14,
  ATTACH_FILES = 1 << 15,
  READ_MESSAGE_HISTORY = 1 << 16,
  MENTION_EVERYONE = 1 << 17,
  USE_EXTERNAL_EMOJIS = 1 << 18,
  VIEW_GUILD_INSIGHTS = 1 << 19,
  CONNECT = 1 << 20,
  SPEAK = 1 << 21,
  MUTE_MEMBERS = 1 << 22,
  DEAFEN_MEMBERS = 1 << 23,
  MOVE_MEMBERS = 1 << 24,
  USE_VAD = 1 << 25,
  CHANGE_NICKNAME = 1 << 26,
  MANAGE_NICKNAMES = 1 << 27,
  MANAGE_ROLES = 1 << 28,
  MANAGE_WEBHOOKS = 1 << 29,
  MANAGE_EMOJIS = 1 << 30,
}

// List of all limits
export const AUDIT_LOG_LIMITS = {
  ENTRY_LIMIT_MIN: 1,
  ENTRY_LIMIT_MAX: 100,
};

export const CHANNEL_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  TOPIC_MAX: 1024,
  SLOWMODE_MAX: 21600,
  BITRATE_MIN: 8000,
  BITRATE_MAX: 96000,
  BITRATE_MAX_VIP: 128000,
  USER_LIMIT_MAX: 99,
  PARENT_CHILD_CHANNEL_MAX: 50,
};

export const EMBED_LIMITS = {
  TITLE: 256,
  DESCRIPTION: 2048,
  FIELDS: 25,
  FIELD_NAME: 256,
  FIELD_VALUE: 1024,
  FOOTER: 2048,
  AUTHOR: 256,
  TOTAL: 6000,
};

export const GUILD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  BAN_DELETE_MESSAGE_MAX: 7,
  PRUNE_MIN: 1,
  TEMPLATE_NAME_MIN: 1,
  TEMPLATE_NAME_MAX: 100,
  TEMPLATE_DESCRIPTION_MAX: 120,
  GET_GUILDS_MIN: 1,
  GET_GUILDS_MAX: 100,
};

export const MESSAGE_LIMITS = {
  GET_MESSAGES_LIMIT_MIN: 1,
  GET_MESSAGES_LIMIT_MAX: 100,
  CONTENT_MAX: 2000,
  GET_REACTION_LIMIT_MIN: 1,
  GET_REACTION_LIMIT_MAX: 100,
  BULK_DELETE_MIN: 2,
  BULK_DELETE_MAX: 100,
};

export const USER_LIMITS = {
  USERNAME_MIN: 2,
  USERNAME_MAX: 32,
  NICKNAME_MIN: 1,
  NICKNAME_MAX: 32,
  INVALID_USERNAME_SUBSTR: ['@', '#', ':', '```'],
  INVALID_USERNAMES: ['discordtag', 'everyone', 'here'],
};

export const WEBHOOK_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 80,
  INVALID_NAMES: ['clyde'],
  EMBED_COUNT_MAX: 10,
};

export const LIMITS = {
  AuditLog: AUDIT_LOG_LIMITS,
  Channel: CHANNEL_LIMITS,
  Embed: EMBED_LIMITS,
  Guild: GUILD_LIMITS,
  Message: MESSAGE_LIMITS,
  User: USER_LIMITS,
  Webhook: WEBHOOK_LIMITS,
};

const ROUTE_REGEX = /\/(?!guilds|channels|webhooks)([a-z-]+)\/(?:\d+)/g;
const ROUTE_REPLACER = '/$1/:id';
const WEBHOOK_REGEX = /\/webhooks\/(\d+)\/[a-zA-Z0-9-_]{64,}/;
const WEBHOOK_REPLACER = '/webhooks/$1/:token';
const MESSAGE_ID_REGEX = /\/channels\/\d+\/messages\//;
const DISCORD_EPOCH = 1420070400000;
const INVALID_HEADER_REGEX = /[^\t\x20-\x7e\x80-\xff]/;

export const REST_CONSTANTS = {
  ROUTE_REGEX,
  ROUTE_REPLACER,
  WEBHOOK_REGEX,
  WEBHOOK_REPLACER,
  MESSAGE_ID_REGEX,
  DISCORD_EPOCH,
  INVALID_HEADER_REGEX,
};
