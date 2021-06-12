export interface EmbedAuthor {
  icon_url?: string;
  name?: string;
  proxy_icon_url?: string;
  url?: string;
}

export interface EmbedMedia {
  height?: number;
  proxy_url?: string;
  url?: string;
  width?: number;
}

export interface EmbedField {
  inline?: boolean;
  name: string;
  value: string;
}

export interface EmbedFooter {
  icon_url?: string;
  proxy_url?: string;
  text: string;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

export default interface Embed {
  author?: EmbedAuthor;
  color?: number;
  description?: string;
  fields?: EmbedField[];
  footer?: EmbedFooter;
  image?: EmbedMedia;
  provider?: EmbedProvider;
  thumbnail?: EmbedMedia;
  timestamp?: Date;
  title?: string;
  type?: EmbedType;
  url?: string;
  video?: EmbedMedia;
}
