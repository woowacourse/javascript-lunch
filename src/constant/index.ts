const REGEX = Object.freeze({
  link: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-z]+).*$/,
});

const CATEGORY_IMAGE_PATH = Object.freeze({
  한식: './category-korean.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  일식: './category-japanese.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
});

const FAVORITE_IMAGE_PATH = Object.freeze({
  starred: './favorite-icon-filled.png',
  unstarred: './favorite-icon-lined.png',
});

const ERROR_MESSAGE = {
  categoryIsEmpty: '카테고리를 선택해 주세요!',
  nameIsEmpty: '음식점 이름을 입력해 주세요!',
  distanceInMinutesIsEmpty: '거리를 선택해 주세요!',
  linkIsInvalid: '올바른 주소를 입력해 주세요!',
};

const RESTAURANT_DISTANCES_IN_MINUTE = ['5', '10', '15', '20', '25', '30'];

const RESTAURANT_CATEGORIES = [
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
];

const LOCAL_STORAGE_KEY = 'RESTAURANT_APP';

export {
  REGEX,
  ERROR_MESSAGE,
  CATEGORY_IMAGE_PATH,
  FAVORITE_IMAGE_PATH,
  RESTAURANT_DISTANCES_IN_MINUTE,
  RESTAURANT_CATEGORIES,
  LOCAL_STORAGE_KEY,
};
