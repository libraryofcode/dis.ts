import Base from './Base';

export default interface StageInstance extends Base {
  channel_id: string;
  discoverable_disabled: boolean;
  guild_id: string;
  privacy_level: StagePrivacyLevel;
  topic: string;
}

export enum StagePrivacyLevel {
  PUBLIC = 1,
  GUILD_ONLY,
}
