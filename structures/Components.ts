export interface ActionRow {
  components: ActionRowComponents[];
  type: ComponentType.ACTION_ROW;
}

export type ActionRowComponents = Button | Dropdown;

export type Button = InteractionButton | URLButton;

export interface ButtonBase {
  disabled?: boolean;
  emoji?: unknown; // TODO Partial Emoji (name or id)
  label?: string;
  type: ComponentType.BUTTON;
}

export enum ComponentType {
  ACTION_ROW = 1,
  BUTTON,
  DROPDOWN,
}

export interface Dropdown {
  custom_id: string;
  max_values?: number;
  min_values?: number;
  options: DropdownOptions[];
  placeholder?: string;
  type: ComponentType.DROPDOWN;
}

export interface DropdownOptions {
  default?: boolean;
  description?: string;
  emoji?: unknown; // TODO Partial Emoji (name or id)
  label: string;
  value: number | string;
}

export interface InteractionButton extends ButtonBase {
  custom_id: string;
  style: InteractionButtonStyle.BLURPLE | InteractionButtonStyle.GREEN | InteractionButtonStyle.GREY | InteractionButtonStyle.RED;
}

export enum InteractionButtonStyle {
  BLURPLE = 1,
  GREY,
  GREEN,
  RED,
  LINK,
}

export interface URLButton extends ButtonBase {
  style: InteractionButtonStyle.LINK;
  url: string;
}
