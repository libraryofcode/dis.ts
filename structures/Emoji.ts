import Base from './Base';

export default interface Emoji extends Base {
  animated: boolean;
  available: boolean;
  managed: boolean;
  name: string;
  require_colons: boolean;
  roles: string[];
  user?: unknown; // TODO User
}

export interface PartialEmoji {
  animated?: true;
  id: string | null;
  name: string | null;
}
