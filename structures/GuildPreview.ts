import Base from './Base';
import Emoji from './Emoji';
import { GuildFeatures } from './Guild';

export default interface GuildPreview extends Base {
  approximate_member_count: number;
  approximate_presence_count: number;
  description: string | null;
  discovery_splash: string | null;
  emojis: Emoji[];
  features: GuildFeatures[];
  icon: string | null;
  name: string;
  splash: string | null;
}
