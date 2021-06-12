import Base from './Base';

export default interface Team extends Base {
  icon: string | null;
  members: TeamMember[];
  name: string;
  owner_user_id: string;
}

export interface TeamMember {
  membership_state: TeamMembershipState;
  permissions: [ '*' ];
  team_id: string;
  user: unknown; // TODO Partial User = avatar, discriminator, id, and username
}

export enum TeamMembershipState {
  INVITED = 1,
  ACCEPTED,
}
