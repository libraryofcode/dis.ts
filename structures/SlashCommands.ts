import Base from './Base';

export default interface ApplicationCommand extends Base {
  application_id: string;
  default_permission?: boolean;
  description: string;
  name: string;
  options?: ApplicationCommandOption[];
}

export interface ApplicationCommandOption {
  choices?: ApplicationCommandOptionChoice[];
  description: string;
  name: string;
  options?: ApplicationCommandOption[];
  required?: boolean;
  type: ApplicationCommandOptionType;
}

export interface ApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
}
