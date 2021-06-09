import { MessageApplication } from './Application';
import Attachment from './Attachment';
import Base from './Base';
import Channel, { ChannelMention } from './Channel';
import { ActionRow } from './Components';
import { PartialEmoji } from './Emoji';
import { GuildMemberMessage } from './GuildMember';
import { MessageInteraction } from './Interaction';
import Sticker from './Sticker';

export default interface Message extends Base {
  activity?: MessageActivity;
  application?: MessageApplication;
  application_id?: string;
  attachments: Attachment[];
  author: unknown; // TODO User
  channel_id: string;
  components: ActionRow[];
  content: string;
  edited_timestamp: Date | null;
  embeds: unknown[]; // TODO Embed
  flags?: MessageFlags;
  guild_id?: string;
  interaction?: MessageInteraction;
  member?: GuildMemberMessage;
  mention_channels?: ChannelMention[];
  mention_everyone: boolean;
  mention_roles: string[];
  mentions: unknown[]; // TODO Extended user interface with member: GuildMemberMessage for MESSAGE_CREATE/UPDATE
  message_reference?: MessageReference;
  nonce?: string | number;
  pinned: boolean;
  reactions?: Reaction[];
  referenced_message?: Message | null;
  stickers?: Sticker[];
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

export interface MessageReferenceCreate extends MessageReference {
  fail_if_not_exists?: boolean;
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
  GUILD_DISCOVERY_DISQUALIFIED = 14,
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
