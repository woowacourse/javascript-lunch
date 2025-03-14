export const ADD_RESTAURANT_MODAL = {
  classNames: ['add-restaurant-modal'],
};

export const DELETE_INFO_BUTTON = {
  type: 'button',
  classNames: ['button--secondary', 'close-modal-button', 'delete-item-button'],
  content: '삭제하기',
};

export const CLOSE_INFO_BUTTON = {
  type: 'submit',
  classNames: ['button--primary', 'close-modal-button'],
  content: '닫기',
};

export const RESTAURANT_INFO_MODAL = {
  classNames: ['restaurant-info-modal'],
};

export const CATEGORY = {
  label: '카테고리',
  name: 'category',
  required: true,
  lists: new Map([
    [null, '선택해주세요'],
    ['KOREAN', '한식'],
    ['CHINESE', '중식'],
    ['JAPANESE', '일식'],
    ['WESTERN', '양식'],
    ['ASIAN', '아시안'],
    ['ETC', '기타'],
  ]),
};

export const DISTANCE = {
  label: '거리(도보 이동 시간)',
  name: 'distance',
  required: true,
  lists: new Map([
    [null, '선택해주세요'],
    [5, '5분 내'],
    [10, '10분 내'],
    [15, '15분 내'],
    [20, '20분 내'],
    [30, '30분 내'],
  ]),
};

export const NAME = {
  label: '이름',
  name: 'name',
  helpText: '',
  required: true,
  type: 'text',
};

export const LINK = {
  label: '참고 링크',
  name: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  required: false,
  type: 'url',
};

export const DESCRIPTION = {
  label: '설명',
  name: 'description',
  helpText: '메뉴 등 추가 정보를 입력해 주세요.',
};

export const CANCEL_BUTTON = {
  type: 'button',
  classNames: ['button--secondary', 'close-modal-button'],
  content: '취소하기',
};

export const ADD_BUTTON = {
  type: 'submit',
  classNames: ['button--primary', 'add-item-button'],
  content: '추가하기',
};

export const IMAGE = new Map([
  ['KOREAN', 'category-korean.png'],
  ['CHINESE', 'category-chinese.png'],
  ['JAPANESE', 'category-japanese.png'],
  ['WESTERN', 'category-western.png'],
  ['ASIAN', 'category-asian.png'],
  ['ETC', 'category-etc.png'],
]);

export const TOTAL_ITEMS_TAB = {
  type: 'button',
  classNames: ['tab', 'total-items'],
  content: '모든 음식점',
};

export const FREQUENT_ITEMS_TAB = {
  type: 'button',
  classNames: ['tab', 'frequent-items'],
  content: '자주 가는 음식점',
};

export const CATEGORY_FILTER = {
  label: '',
  name: 'category-filter',
  required: false,
  lists: new Map([
    [null, '전체'],
    ['KOREAN', '한식'],
    ['CHINESE', '중식'],
    ['JAPANESE', '일식'],
    ['WESTERN', '양식'],
    ['ASIAN', '아시안'],
    ['ETC', '기타'],
  ]),
};

export const SORT_SELECTOR = {
  label: '',
  name: 'sort-selector',
  required: false,
  default: 'name',
  lists: new Map([
    ['name', '이름순'],
    ['distance', '거리순'],
  ]),
};
