import Base from './Base';

export default interface GuildIntegration extends Base {
  account: IntegrationAccount;
  application?: IntegrationApplication;
  enable_emoticons?: boolean;
  enabled: boolean;
  expire_behavior?: IntegrationExpireBehavior;
  expire_grace_period?: number;
  name: string;
  revoked?: boolean;
  role_id?: string;
  subscriber_count?: number;
  synced_at: Date;
  syncing?: boolean;
  type: InterationType;
  user?: unknown; // TODO User
}

export interface BotIntegration extends Base {
  account: IntegrationAccount;
  application?: IntegrationApplication;
  enabled: boolean;
  name: string;
  type: 'discord';
}

export interface IntegrationAccount extends Base {
  name: string;
}

export interface IntegrationApplication extends Base {
  bot?: unknown; // TODO User
  description: string;
  icon: string | null;
  name: string;
  summary: string;
}

export enum IntegrationExpireBehavior {
  REMOVE_ROLE,
  KICK,
}

export type InterationType = 'twitch' | 'youtube' | 'discord';
