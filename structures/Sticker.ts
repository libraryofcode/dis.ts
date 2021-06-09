import Base from './Base';

export default interface Sticker extends Base {
  asset: string;
  description: string;
  format_type: StickerFormatType;
  name: string;
  pack_id: string;
  tags?: string;
}

export enum StickerFormatType {
  PNG = 1,
  APNG,
  LOTTIE,
}
