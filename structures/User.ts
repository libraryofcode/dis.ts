import Base from './Base';

export enum UserPremiumType {
  NONE,
  NITRO_CLASSIC,
  NITRO,
}

export default interface User extends Base {
  avatar?: string;
  bot?: boolean;
  discriminator?: string;
  email?: string;
  flags?: number;
  locale?: string;
  mfa_enabled?: boolean;
  premium_type?: UserPremiumType;
  public_flags?: number;
  system?: boolean;
  verified?: boolean;
}
