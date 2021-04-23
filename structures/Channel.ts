import Base from './Base';

export enum ChannelType {
  GUILD_TEXT,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_STORE,
  GUILD_STAGE_VOICE = 13,
}

export interface Overwrite extends Base {
  allow: string;
  deny: string;
  type: 0 | 1;
}

export interface VoiceRegion extends Base {
  custom: boolean;
  deprecated: boolean;
  name: string;
  optimal: boolean;
  vip: boolean;
}

export enum VideoQuality {
  AUTO = 1,
  FULL,
}

export default interface Channel extends Base {
  application_id?: string;
  bitrate?: number;
  guild_id?: number;
  icon?: string | null;
  last_message_id?: string | null;
  last_pin_timestamp?: Date | null;
  name?: string;
  nsfw?: boolean;
  owner_id?: string;
  parent_id?: string | null;
  permission_overwrites?: Overwrite[];
  position?: number;
  rate_limit_per_user?: number;
  recipients?: [unknown]; // TODO User
  rtc_region?: VoiceRegion | null;
  topic?: string | null;
  type: ChannelType;
  user_limit?: number;
  video_quality_mode?: VideoQuality;
}
