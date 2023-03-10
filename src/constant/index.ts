const REGEX = Object.freeze({
  link: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-z]+).*$/,
});

const RESTAURANT_CATEGORIES = [
  '전체',
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
];

const ERROR_MESSAGE = {
  category: '카테고리를 선택해 주세요!',
  name: '이름을 입력해 주세요!',
  distance: '거리를 선택해 주세요!',
  link: '올바른 주소를 입력해 주세요!',
};

const RESTAURANT_DISTANCES = ['5', '10', '15', '20', '25', '30'];

const LOCAL_STORAGE_KEY = 'RESTAURANT_APP';

const CATEGORY_IMG_PATH = {
  전체: null,
  한식: './category-korean.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  일식: './category-japanese.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
};

const STAR_IMG_PATH = {
  fill: './favorite-icon-filled.png',
  line: './favorite-icon-lined.png',
};

export {
  REGEX,
  ERROR_MESSAGE,
  RESTAURANT_CATEGORIES,
  RESTAURANT_DISTANCES,
  LOCAL_STORAGE_KEY,
  CATEGORY_IMG_PATH,
  STAR_IMG_PATH,
};
