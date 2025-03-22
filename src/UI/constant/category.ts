import { CATEGORY_IMAGE_SRC } from '../../../public/assets/imagePaths';

interface Category {
  readonly [key: string]: {
    SRC: string;
    ALT: string;
  };
}

const CATEGORY: Category = Object.freeze({
  KOREAN: {
    SRC: CATEGORY_IMAGE_SRC.KOREAN,
    ALT: '한식',
  },
  CHINESE: {
    SRC: CATEGORY_IMAGE_SRC.CHINESE,
    ALT: '중식',
  },
  JAPANESE: {
    SRC: CATEGORY_IMAGE_SRC.JAPANESE,
    ALT: '일식',
  },
  WESTERN: {
    SRC: CATEGORY_IMAGE_SRC.WESTERN,
    ALT: '양식',
  },
  ASIAN: {
    SRC: CATEGORY_IMAGE_SRC.ASIAN,
    ALT: '아시안',
  },
  ETC: {
    SRC: CATEGORY_IMAGE_SRC.ETC,
    ALT: '기타',
  },
});

export default CATEGORY;
