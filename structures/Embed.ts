export default interface Embed {
  author?: {
    icon_url?: string;
    name?: string;
    proxy_icon_url?: string;
    url?: string;
  };
  color?: number;
  description?: string;
  fields?: [ { inline?: boolean; name: string; value: string } ];
  footer?: {
    icon_url?: string;
    text: string;
  };
  image?: {
    height?: number;
    proxy_url?: string;
    url?: string;
    width?: number;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  thumbnail?: {
    height?: number;
    proxy_url?: string;
    url?: string;
    width?: number;
  };
  timestamp?: Date;
  title?: string;
  type?: 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
  url?: string;
  video?: {
    height?: number;
    proxy_url?: string;
    url?: string;
    width?: number;
  };
}
