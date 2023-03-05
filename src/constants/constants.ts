const REGEX = {
  VALID_URL:
    /^((ftp|http|https):\/\/)?([a-zA-Z0-9]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})(:[0-9]+)?(\/.*)?$/,
  VALID_NAME: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣㅑ-ㅣㅠ-ㅣ0-9!@#$%^&*?'\",. ]+$/,
};

const ERROR_MESSAGE = {
  EMPTY_CATEGORY: '카테고리를 선택해 주세요.',
  EMPTY_DISTANCE: '거리를 선택해 주세요.',
  INVALID_NAME: `음식점 이름은 한글, 영어, 숫자, !@#$%^&*?'",.만 포함하여 입력해 주세요.`,
  INVALID_LINK: '유효한 링크를 입력해 주세요.',
};

const MESSAGE = {
  LINK_DEFAULT_CAPTION: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
};

const LOCAL_STORAGE_KEY = 'restaurants';

const CATEGORY_FILTER_OPTIONS = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];

const SORTING_FILTER_OPTIONS = ['이름순', '거리순'];

const SORTING_FILTER_VALUES = ['name', 'distance'];

const CATEGORY_OPTIONS = ['선택해 주세요', '한식', '중식', '일식', '양식', '아시안', '기타'];

const CATEGORY_OPTION_VALUES = ['', '한식', '중식', '일식', '양식', '아시안', '기타'];

const DISTANCE_OPTIONS = ['선택해 주세요', '5분 내', '10분 내', '15분 내', '20분 내', '30분 내'];

const DISTANCE_OPTION_VALUES = ['', '5', '10', '15', '20', '30'];

const SELECT_OPTIONS = {
  CATEGORY_FILTER: {
    text: CATEGORY_FILTER_OPTIONS,
    value: CATEGORY_FILTER_OPTIONS,
  },
  SORTING_FILTER: {
    text: SORTING_FILTER_OPTIONS,
    value: SORTING_FILTER_VALUES,
  },
  CATEGORY: {
    text: CATEGORY_OPTIONS,
    value: CATEGORY_OPTION_VALUES,
  },
  DISTANCE: {
    text: DISTANCE_OPTIONS,
    value: DISTANCE_OPTION_VALUES,
  },
};

export { REGEX, ERROR_MESSAGE, MESSAGE, LOCAL_STORAGE_KEY, SELECT_OPTIONS };
