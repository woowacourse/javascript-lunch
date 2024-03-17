const CATEGORY_OPTIONS = [
  { value: '', content: '선택해 주세요' },
  { value: '한식', content: '한식' },
  { value: '중식', content: '중식' },
  { value: '일식', content: '일식' },
  { value: '양식', content: '양식' },
  { value: '아시안', content: '아시안' },
  { value: '기타', content: '기타' },
];

const DISTANCE_OPTIONS = [
  { value: '', content: '선택해 주세요' },
  { value: '5', content: '5분 내' },
  { value: '10', content: '10분 내' },
  { value: '15', content: '15분 내' },
  { value: '20', content: '20분 내' },
  { value: '25', content: '25분 내' },
  { value: '30', content: '30분 내' },
];

const CATEGORY_FILTER_OPTIONS = [
  { value: '전체', content: '전체' },
  { value: '한식', content: '한식' },
  { value: '중식', content: '중식' },
  { value: '일식', content: '일식' },
  { value: '양식', content: '양식' },
  { value: '아시안', content: '아시안' },
  { value: '기타', content: '기타' },
];

const DISTANCE_FILTER_OPTIONS = [
  { value: 'name', content: '이름순' },
  { value: 'distance', content: '거리순' },
];

const ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS = {
  options: CATEGORY_OPTIONS,
  label: '카테고리',
  name: 'category',
  id: 'category',
  isRequired: true,
};

const ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS = {
  options: DISTANCE_OPTIONS,
  label: '거리(도보 이동 시간)',
  name: 'distance',
  id: 'distance',
  isRequired: true,
};

const FILTER_DROPDOWN_PROPS = {
  options: CATEGORY_FILTER_OPTIONS,
  name: 'category',
  id: 'category-filter',
  className: 'restaurant-filter',
  isRequired: false,
};

const SORT_DROPDOWN_PROPS = {
  options: DISTANCE_FILTER_OPTIONS,
  name: 'sorting',
  id: 'sorting-filter',
  className: 'restaurant-filter',
  isRequired: false,
};

const CANCEL_BUTTON_PROPS = {
  id: 'cancel',
  type: 'reset',
  variant: 'secondary',
  content: '취소하기',
};

const ADD_BUTTON_PROPS = {
  id: 'add',
  type: 'submit',
  variant: 'primary',
  content: '추가하기',
};

const DELETE_BUTTON_PROPS = {
  id: 'delete',
  type: 'button',
  variant: 'secondary',
  content: '삭제하기',
};

const CLOSE_BUTTON_PROPS = {
  id: 'close',
  type: 'button',
  variant: 'primary',
  content: '닫기',
};

export {
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
  DISTANCE_FILTER_OPTIONS,
  ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS,
  ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS,
  FILTER_DROPDOWN_PROPS,
  SORT_DROPDOWN_PROPS,
  CANCEL_BUTTON_PROPS,
  ADD_BUTTON_PROPS,
  DELETE_BUTTON_PROPS,
  CLOSE_BUTTON_PROPS,
};
