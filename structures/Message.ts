import Base from './Base';
import Channel from './Channel';
import { PartialEmoji } from './Emoji';

export default interface Message extends Base {
  activity?: MessageActivity;
  application?: unknown; // TODO Partial application
  attachments: unknown[]; // TODO Attachment
  author: unknown; // TODO User
  channel_id: string;
  content: string;
  edited_timestamp: Date | null;
  embeds: unknown[]; // TODO Embed
  flags?: MessageFlags;
  guild_id?: string;
  interaction?: unknown; // TODO Message Interaction
  member?: unknown; // TODO Partial Member?
  mention_channels?: string[];
  mention_everyone: boolean;
  mention_roles: string[];
  mentions: unknown[]; // TODO Extended user interface with member object for MESSAGE_CREATE/UPDATE
  message_reference?: MessageReference;
  nonce?: string | number;
  pinned: boolean;
  reactions?: Reaction[];
  referenced_message?: Message | null;
  stickers?: unknown; // TODO Sticker
  thread?: Channel;
  timestamp: Date;
  tts: boolean;
  type: MessageType;
  webhook_id?: string;
}

export interface MessageActivity {
  party_id?: string;
  type: MessageActivityType;
}

export enum MessageActivityType {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  JOIN_REQUEST = 5,
}

export enum MessageFlags {
  CROSSPOSTED = 1 << 0,
  IS_CROSSPOST = 1 << 1,
  SUPPRESS_EMBEDS = 1 << 2,
  SOURCE_MESSAGE_DELETED = 1 << 3,
  URGENT = 1 << 4,
  HAS_THREAD = 1 << 5,
  EPHEMERAL = 1 << 6,
  LOADING = 1 << 7,
}

export interface MessageReference {
  channel_id?: string;
  guild_id?: string;
  message_id?: string;
}

export enum MessageType {
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
  GUILD_DISCOVERY_DISQUALIFIED,
  GUILD_DISCOVERY_REQUALIFIED,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
  THREAD_CREATED,
  REPLY,
  APPLICATION_COMMAND,
  THREAD_STARTER_MESSAGE,
  GUILD_INVITE_REMINDER,
}

export interface Reaction {
  count: number;
  emoji: PartialEmoji;
}
