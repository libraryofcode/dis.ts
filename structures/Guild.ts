import Base from './Base';
import Channel from './Channel';
import GuildMember from './GuildMember';

export default interface Guild extends Base {
  afk_channel_id: string | null;
  afk_timeout: number;
  application_id: string | null;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  banner: string | null;
  channels?: Channel[];
  default_message_notifications: DefaultMessageNotificationLevel;
  description: string | null;
  discovery_splash: string | null;
  emojis: unknown[]; // TODO emojis
  explicit_content_filter: ExplicitContentFilterLevel;
  features: GuildFeatures[];
  icon: string | null;
  icon_hash?: string | null;
  joined_at?: Date;
  large?: boolean;
  max_members?: number;
  max_presences?: number | null;
  max_video_channel_users?: number;
  member_count?: number;
  members?: GuildMember[];
  mfa_level: MFALevel;
  name: string;
  nsfw_level: GuildNSFWLevel;
  owner?: boolean;
  owner_id: string;
  permissions?: string;
  preferred_locale: string;
  premium_subscription_count?: number;
  premium_tier: PremiumTier;
  presences?: unknown[]; // TODO partial presence update
  public_updates_channel_id: string | null;
  region: string;
  roles: unknown[]; // TODO roles
  rules_channel_id: string | null;
  splash: string | null;
  system_channel_flags: SystemChannelFlags;
  system_channel_id: string | null;
  unavailable?: boolean;
  vanity_url_code: string | null;
  verification_level: VerificationLevel;
  voice_states?: unknown[]; // TODO partial voice states
  welcome_screen?: WelcomeScreen;
  widget_channel_id?: string | null;
  widget_enabled?: boolean;
}

export interface UnavailableGuild extends Base {
  unavailable?: true;
}

export interface InviteGuild extends Base {
  banner: string | null;
  description: string | null;
  features: GuildFeatures[];
  icon: string | null;
  name: string;
  nsfw: boolean;
  nsfw_level: 0 | 1 | 2; // TODO Enumerate this, pending Discord documentation
  splash: string | null;
  vanity_url_code: string | null;
  verification_level: VerificationLevel;
  welcome_screen?: WelcomeScreen;
}

export interface TemplateGuild {
  afk_channel_id: string | null;
  afk_timeout: number;
  channels?: Channel[];
  default_message_notifications: DefaultMessageNotificationLevel;
  description: string | null;
  explicit_content_filter: ExplicitContentFilterLevel;
  icon_hash?: string | null;
  name: string;
  preferred_locale: string;
  region: string;
  roles: unknown[]; // TODO roles
  system_channel_flags: SystemChannelFlags;
  system_channel_id: string | null;
  verification_level: VerificationLevel;
}

export interface WebhookGuild extends Base {
  icon: string;
  name: string;
}

export enum DefaultMessageNotificationLevel {
  ALL_MESSAGES,
  ONLY_MENTIONS,
}

export enum ExplicitContentFilterLevel {
  DISABLED,
  MEMBERS_WITHOUT_ROLES,
  ALL_MEMBERS,
}

export type GuildFeatures = 'AMINATED_ICON' | 'BANNER' | 'COMMERCE' | 'COMMUNITY' | 'DISCOVERABLE' | 'FEATURABLE' | 'INVITE_SPLASH' | 'MEMBER_VERIFICATION_GATE_ENABLED' | 'NEWS' | 'PARTNERED' | 'PREVIEW_ENABLED' | 'VANITY_URL' | 'VERIFIED' | 'VIP_REGIONS' | 'WELCOME_SCREEN_ENABLED';

export enum GuildNSFWLevel {
  DEFAULT,
  EXPLICIT,
  SAFE,
  AGE_RESTRICTED,
}

export enum MFALevel {
  NONE,
  ELEVATED,
}

export enum PremiumTier {
  NONE,
  TIER_1,
  TIER_2,
  TIER_3,
}

export enum SystemChannelFlags {
  SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
  SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
  SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
}

export enum VerificationLevel {
  NONE,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

export interface WelcomeScreen {
  description: string | null;
  welcome_channels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
  channel_id: string;
  description: string;
  emoji_id: string | null;
  emoji_name: string | null;
}
