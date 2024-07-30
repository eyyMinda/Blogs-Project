interface EmojiObject {
  activeSkinTone: string;
  emoji: string;
  getImageUrl: Function;
  imageUrl: string;
  isCustom: boolean;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
}
