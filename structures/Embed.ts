export interface EmbedAuthor {
  icon_url?: string;
  name?: string;
  proxy_icon_url?: string;
  url?: string;
}

export interface EmbedFooter {
  icon_url?: string;
  text: string;
}

export interface EmbedField {
  inline?: boolean;
  name: string;
  value: string;
}

export interface EmbedFooter {
  icon_url?: string;
  text: string;
}

export interface EmbedMedia {
  height?: number;
  proxy_url?: string;
  url?: string;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

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
  type?: 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
  url?: string;
  video?: EmbedMedia;
}
