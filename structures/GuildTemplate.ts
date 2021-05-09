import { TemplateGuild } from './Guild';

export default interface GuildTemplate {
  code: string;
  created_at: Date;
  creator: unknown; // TODO User
  creator_id: string;
  description: string | null;
  is_dirty: boolean | null;
  name: string;
  serialized_source_guild: TemplateGuild; // REVIEW This is partial but doesn't match GuildPartial interface
  source_guild_id: string;
  updated_at: Date;
  usage_count: number;
}
