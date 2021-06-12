import Base from './Base';
import Channel from './Channel';
import { ComponentType } from './Components';
import GuildMember from './GuildMember';
import Message from './Message';
import { ApplicationCommandOptionType } from './SlashCommands';

export default interface Interaction extends Base {
  application_id: string;
  channel_id?: string;
  data?: ApplicationCommandInteractionData;
  guild_id?: string;
  member?: GuildMember;
  message?: Message;
  token: string;
  type: InteractionType;
  user?: unknown; // TODO User
  readonly version: 1;
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND,
  MESSAGE_COMPONENT,
}

export interface ApplicationCommandInteractionData extends Base {
  component_type: ComponentType;
  custom_id: string;
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
  resolved?: ApplicationCommandInteractionDataResolved;
}

export interface ApplicationCommandInteractionDataResolved {
  channels?: { [s: string]: Pick<Channel, 'id' | 'name' | 'type' | 'permission_overwrites'> };
  members?: { [s: string]: Omit<GuildMember, 'user' | 'deaf' | 'mute'> };
  roles?: { [s: string]: unknown }; // TODO Role
  users?: { [s: string]: unknown }; // TODO User
}

export interface ApplicationCommandInteractionDataOption {
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
  type: ApplicationCommandOptionType;
  value?: any; // TODO ????
}

export interface MessageInteraction extends Base {
  name: string;
  type: InteractionType;
  user: unknown; // TODO User
}
