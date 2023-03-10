export const REGEX = {
  VALID_URL:
    /^((ftp|http|https):\/\/)?([a-zA-Z0-9]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})(:[0-9]+)?(\/.*)?$/,
  VALID_NAME: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣㅑ-ㅣㅠ-ㅣ0-9!@#$%^&*?'\",. ]+$/,
} as const;

export const ERROR_MESSAGE = {
  EMPTY_CATEGORY: '카테고리를 선택해 주세요.',
  EMPTY_DISTANCE: '거리를 선택해 주세요.',
  INVALID_NAME: `음식점 이름은 한글, 영어, 숫자, !@#$%^&*?'",.만 포함하여 입력해 주세요.`,
  INVALID_LINK: '유효한 링크를 입력해 주세요.',
} as const;

export const MESSAGE = {
  LINK_DEFAULT_CAPTION: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
} as const;

export const CATEGORY = {
  ALL: '전체',
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  ASIAN: '아시안',
  WESTERN: '양식',
  ETC: '기타',
} as const;

export const SORTING_CRITERION = {
  NAME: 'name',
  DISTANCE: 'distance',
} as const;

export const TAB_ID = {
  ALL: 'all-restaurants-tab',
  FAVORITE: 'favorite-restaurants-tab',
};

export const TAB_TITLE = {
  ALL: '모든 음식점',
  FAVORITE: '자주 가는 음식점',
};
