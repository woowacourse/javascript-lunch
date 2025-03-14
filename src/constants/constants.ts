export interface SelectField {
  label: string;
  name: string;
  lists: Map<string, string>;
}

export const CATEGORY: SelectField = {
  label: '카테고리',
  name: 'category',
  lists: new Map([
    ['KOREAN', '한식'],
    ['CHINESE', '중식'],
    ['JAPANESE', '일식'],
    ['WESTERN', '양식'],
    ['ASIAN', '아시안'],
    ['ETC', '기타'],
  ]),
};

export const DISTANCE: SelectField = {
  label: '거리(도보 이동 시간)',
  name: 'distance',
  lists: new Map([
    ['FIVE_MIN', '5분 내'],
    ['TEN_MIN', '10분 내'],
    ['FIFTEEN_MIN', '15분 내'],
    ['TWENTY_MIN', '20분 내'],
    ['THIRTY_MIN', '30분 내'],
  ]),
};

export interface FormField {
  label: string;
  name: string;
  helpText: string;
  required?: boolean;
  type?: 'text' | 'url' | 'number';
}

export const NAME: FormField = {
  label: '이름',
  name: 'name',
  helpText: '',
  required: true,
  type: 'text',
};

export const LINK: FormField = {
  label: '참고 링크',
  name: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  required: false,
  type: 'url',
};

export const DESCRIPTION: FormField = {
  label: '설명',
  name: 'description',
  helpText: '메뉴 등 추가 정보를 입력해 주세요.',
};

export interface ButtonField {
  type: 'button' | 'submit';
  className: string;
  content: string;
}

export const CANCEL_BUTTON: ButtonField = {
  type: 'button',
  className: 'button--secondary',
  content: '취소하기',
};

export const ADD_BUTTON: ButtonField = {
  type: 'submit',
  className: 'button--primary',
  content: '추가하기',
};

export const DELETE_BUTTON: ButtonField = {
  type: 'button',
  className: 'delete-button button--secondary',
  content: '삭제하기',
};

export const CLOSE_BUTTON: ButtonField = {
  type: 'button',
  className: 'close-button button--primary',
  content: '닫기',
};

type Category = '한식' | '중식' | '일식' | '양식' | '아시안' | '기타' | '전체';

export const IMAGE: Map<Category, string> = new Map([
  ['한식', 'category-korean.png'],
  ['중식', 'category-chinese.png'],
  ['일식', 'category-japanese.png'],
  ['양식', 'category-western.png'],
  ['아시안', 'category-asian.png'],
  ['기타', 'category-etc.png'],
]);

export const FAV_STAR = {
  className: 'favorite-star',
  activeSrc: 'favorite-icon-filled.png',
  inactiveSrc: 'favorite-icon-lined.png',
};

export interface multiSelect {
  name: string;
  id: string;
  class: string;
  options: string[];
}

export const CATEGORY_FILTER_SELECT: multiSelect = {
  name: 'category',
  id: 'category-filter',
  class: 'restaurant-filter',
  options: ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'],
};

export const SORTING_FILTER_SELECT: multiSelect = {
  name: 'sorting',
  id: 'sorting-filter',
  class: 'restaurant-filter',
  options: ['이름순', '거리순'],
};

export interface filterTab {
  class: string;
  active: boolean;
  dataTab: string;
  text: string;
}

export const ALL_RESTAURANT_TAB: filterTab = {
  class: 'tab',
  active: true,
  dataTab: 'all',
  text: '모든 음식점',
};

export const FAVORITE_RESTAURANT_TAB: filterTab = {
  class: 'tab',
  active: false,
  dataTab: 'favorites',
  text: '자주 가는 음식점',
};
