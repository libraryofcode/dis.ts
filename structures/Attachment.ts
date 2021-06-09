import Base from './Base';

export default interface Attachment extends Base {
  content_type: string; // Good luck
  filename: string;
  height?: number | null;
  proxy_url: string;
  size: number;
  url: string;
  width?: number | null;
}
