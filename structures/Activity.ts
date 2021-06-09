import Emoji from './Emoji';

export default interface Activity {
  application_id?: string;
  assets?: ActivityAssets;
  buttons?: ActivityButtons;
  created_at: number;
  details?: string | null;
  emoji?: Emoji | null;
  flags?: ActivityFlags;
  instance?: boolean;
  name: string;
  party?: ActivityParty;
  secrets?: ActivitySecrets;
  state?: string | null;
  timestamps?: ActivityTimestamps;
  type: ActivityType;
  url?: string | null;
}

export enum ActivityType {
  GAME,
  STREAMING,
  LISTENING,
  WATCHING,
  CUSTOM,
  COMPETING,
}

export interface ActivityTimestamps {
  end?: number;
  start?: number;
}

export interface ActivityParty {
  id?: string;
  size?: [number, number];
}

export interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivitySecrets {
  join?: string;
  match?: string;
  spectate?: string;
}

export enum ActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
}

export interface ActivityButtons {
  label: string;
  url: string;
}

export type Status = 'online' | 'idle' | 'dnd';

export interface ClientStatus {
  desktop?: Status;
  mobile?: Status;
  web?: Status;
}
