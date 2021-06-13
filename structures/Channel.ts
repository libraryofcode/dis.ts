import Base from './Base';
import { PermissionOverwrite } from './Permissions';

export default interface Channel extends Base {
  application_id?: string;
  bitrate?: number;
  guild_id?: number;
  icon?: string | null;
  last_message_id?: string | null;
  last_pin_timestamp?: Date | null;
  member?: ThreadMember;
  member_count?: number;
  message_count?: number;
  name?: string;
  nsfw?: boolean;
  owner_id?: string;
  parent_id?: string | null;
  permission_overwrites?: PermissionOverwrite[];
  position?: number;
  rate_limit_per_user?: number;
  recipients?: [unknown]; // TODO User
  rtc_region?: string | null;
  thread_metadata?: ThreadMetadata;
  topic?: string | null;
  type: ChannelType;
  user_limit?: number;
  video_quality_mode?: VideoQuality;
}

export interface ChannelMention extends Base {
  guild_id: string;
  name: string;
  type: ChannelType;
}

export interface ChannelPartial extends Base {
  name: string;
  type: ChannelType;
}

export interface WebhookChannel extends Base {
  name: string;
}

export enum ChannelType {
  GUILD_TEXT,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_STORE,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD,
  GUILD_PRIVATE_THREAD,
  GUILD_STAGE_VOICE,
}

export interface ThreadMember extends Base {
  flags: number; // REVIEW Discord has no documentation for this
  join_timestamp: Date;
  user_id: string;
}

export interface ThreadMetadata {
  archive_timestamp: Date;
  archived: boolean;
  archiver_id?: string;
  auto_archive_duration: number;
  locked?: boolean;
}

export enum VideoQuality {
  AUTO = 1,
  FULL,
}
