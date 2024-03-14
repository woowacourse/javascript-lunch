import ADD_BUTTON from '../assets/images/add-button.png';
import KOREAN from '../assets/images/category-korean.png';
import CHINESE from '../assets/images/category-chinese.png';
import JAPANESE from '../assets/images/category-japanese.png';
import ASIAN from '../assets/images/category-asian.png';
import WESTERN from '../assets/images/category-western.png';
import ETC from '../assets/images/category-etc.png';

export const IMAGE_MAP = {
  addButton: ADD_BUTTON,
  category: {
    korean: KOREAN,
    chinese: CHINESE,
    japanese: JAPANESE,
    asian: ASIAN,
    western: WESTERN,
    etc: ETC
  }
} as const;
