import Base from './Base';
import Team from './Team';

export default interface Application extends Base {
  bot_public: boolean;
  bot_require_code_grant: boolean;
  cover_image?: string;
  description: string;
  flags: ApplicationFlags;
  guild_id?: string;
  icon: string;
  name: string;
  owner: unknown; // TODO Partial User https://discord.com/developers/docs/resources/application#application-object-application-flags
  primary_sku_id?: string;
  privacy_policy_url?: string;
  rpc_origins?: string[];
  slug?: string;
  summary: string;
  team: Team | null;
  terms_of_service_url?: string;
  verify_key: string;
}

export type MessageApplication = Pick<Application, 'cover_image' | 'description' | 'icon' | 'id' | 'name'>;

export enum ApplicationFlags {
  GATEWAY_PRESENCE = 1 << 12,
  GATEWAY_PRESENCE_LIMITED = 1 << 13,
  GATEWAY_GUILD_MEMBERS = 1 << 14,
  GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
  VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
  EMBEDDED = 1 << 17,
}
