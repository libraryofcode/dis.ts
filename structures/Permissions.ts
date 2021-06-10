// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// NOTE Can't enun bigints, but reverse mappings will cast bigints to stringified keys.
// NOTE See https://github.com/microsoft/TypeScript/issues/40793 and https://github.com/microsoft/TypeScript/issues/37783
import Base from './Base';

enum Permissions {
  CREATE_INSTANT_INVITE = 1n << 0n,
  KICK_MEMBERS = 1n << 1n,
  BAN_MEMBERS = 1n << 2n,
  ADMINISTRATOR = 1n << 3n,
  MANAGE_CHANNELS = 1n << 4n,
  MANAGE_GUILD = 1n << 5n,
  ADD_REACTIONS = 1n << 6n,
  VIEW_AUDIT_LOG = 1n << 7n,
  PRIORITY_SPEAKER = 1n << 8n,
  STREAM = 1n << 9n,
  VIEW_CHANNEL = 1n << 10n,
  SEND_MESSAGES = 1n << 11n,
  SEND_TTS_MESSAGES = 1n << 12n,
  MANAGE_MESSAGES = 1n << 13n,
  EMBED_LINKS = 1n << 14n,
  ATTACH_FILES = 1n << 15n,
  READ_MESSAGE_HISTORY = 1n << 16n,
  MENTION_EVERYONE = 1n << 17n,
  USE_EXTERNAL_EMOJIS = 1n << 18n,
  VIEW_GUILD_INSIGHTS = 1n << 19n,
  CONNECT = 1n << 20n,
  SPEAK = 1n << 21n,
  MUTE_MEMBERS = 1n << 22n,
  DEAFEN_MEMBERS = 1n << 23n,
  MOVE_MEMBERS = 1n << 24n,
  USE_VAD = 1n << 25n,
  CHANGE_NICKNAME = 1n << 26n,
  MANAGE_NICKNAMES = 1n << 27n,
  MANAGE_ROLES = 1n << 28n,
  MANAGE_WEBHOOKS = 1n << 29n,
  MANAGE_EMOJIS = 1n << 30n,
  USE_SLASH_COMMANDS = 1n << 31n,
  REQUEST_TO_SPEAK = 1n << 32n,
  // 1n << 33n
  MANAGE_THREADS = 1n << 34n,
  USE_PUBLIC_THREADS = 1n << 35n,
  USE_PRIVATE_THREADS = 1n << 36n,
}

export interface PermissionOverwrite extends Base {
  allow: string;
  deny: string;
  type: PermissionOverwriteType;
}

export enum PermissionOverwriteType {
  ROLE,
  MEMBER,
}

export default Permissions;
