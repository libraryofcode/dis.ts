import Base from './Base';

export default interface Embed extends Base {
  author?: EmbedAuthor;
  color?: number;
  description?: string;
  fields?: EmbedFields;
  footer?: EmbedFooter;
  image?: EmbedImage;
  provider?: EmbedProvider;
  thumbnail?: EmbedThumbnail;
  timestamp?: Date;
  title?: string;
  type?: EmbedType;
  url?: string;
  video?: EmbedVideo;
}

export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

export interface EmbedFooter {
  icon_url?: string;
  proxy_icon_url?: string;
  text: string;
}

export interface EmbedImage {
  height?: number;
  proxy_url?: string;
  url?: string;
  width?: number;
}

export interface EmbedThumbnail {
  height?: number;
  proxy_url?: string;
  url?: string;
  width?: number;
}

export interface EmbedVideo {
  height?: number;
  proxy_url?: string;
  url?: string;
  width?: number;
}

export interface EmbedProvider {
  name?: string;
  url?: string;
}

export interface EmbedAuthor {
  icon_url?: string;
  name?: string;
  proxy_icon_url?: string;
  url?: string;
}

export interface EmbedFields {
  inline?: boolean;
  name: string;
  value: string;
}
