export const ERROR_MESSAGE = {
  NO_SPECIAL_CHARACTERS: '이름에 특수문자는 입력할 수 없습니다.',
  NAME_LENGTH_LIMIT: '1 ~ 15자 사이의 이름을 입력해 주세요.',
  DUPLICATE_NAME: '이미 존재하는 음식점 이름입니다.',
};

export const NAME_LENGTH = {
  MIN: 1,
  MAX: 15,
};

export const SELECTED_OPTION = {
  NAME: 'name',
  DISTANCE: 'distance',
  All_CATEGORIES: '전체',
};

export const LOCAL_STORAGE_KEY = 'restaurant';

export const REGEX_SPECIAL_CHARACTERS = /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/;
