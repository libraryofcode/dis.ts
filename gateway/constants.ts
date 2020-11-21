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
  'Unknown Error' = 4000,
  'Unknown Opcode' = 4001,
  'Decode Error' = 4002,
  'Not Authenticated' = 4003,
  'Authentication Failed'= 4004,
  'Already Authenticated' = 4005,
  'Invalid RESUME Sequence' = 4007,
  'Rate Limited' = 4008,
  'Session Timed Out' = 4009,
  'Invalid Shard' = 4010,
  'Sharding Required' = 4011,
  'Invalid API Version' = 4012,
  'Invalid Intent(s)' = 4013,
  'Disallowed Intent(s)' = 4014,
}

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
