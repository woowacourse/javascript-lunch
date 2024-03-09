import addRestaurantButtonImage from '/src/assets/image/add-restaurant-button.png';
import categoryKoreanImage from '../assets/image/category-korean.png';
import categoryChineseImage from '../assets/image/category-chinese.png';
import categoryJapaneseImage from '../assets/image/category-japanese.png';
import categoryWesternImage from '../assets/image/category-western.png';
import categoryAsianImage from '../assets/image/category-asian.png';
import categoryEtcImage from '../assets/image/category-etc.png';

const TYPE_SETTING = {
  category: ['한식', '중식', '일식', '양식', '아시안', '기타'] as const,
  minutesWalk: [5, 10, 15, 20, 30] as const,
  sort: ['이름순', '거리순'] as const,
};

const ASSETS = {
  imageUrl: {
    버튼_음식점추가: addRestaurantButtonImage,
    한식: categoryKoreanImage,
    중식: categoryChineseImage,
    일식: categoryJapaneseImage,
    양식: categoryWesternImage,
    아시안: categoryAsianImage,
    기타: categoryEtcImage,
  },
};
export { TYPE_SETTING, ASSETS };
