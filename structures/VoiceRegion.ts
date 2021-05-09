import Base from './Base';

export default interface VoiceRegion extends Base {
  custom: boolean;
  deprecated: boolean;
  name: string;
  optimal: boolean;
  vip: boolean;
}
