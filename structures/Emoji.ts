export default interface Emoji {
  animated: boolean;
  available: boolean;
  id: string | null;
  managed: boolean;
  name: string | null;
  require_colons: boolean;
  roles: string[];
  user?: unknown; // TODO User
}

export interface PartialEmoji {
  animated?: true;
  id: string | null;
  name: string | null;
}
