export const CATEGORY = {
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

export const DISTANCE = {
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

export const NAME = {
  label: '이름',
  name: 'name',
  helpText: '',
  required: 'form-item--required',
  type: 'text',
};

export const LINK = {
  label: '참고 링크',
  name: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  required: '',
  type: 'url',
};

export const DESCRIPTION = {
  label: '설명',
  name: 'description',
  helpText: '메뉴 등 추가 정보를 입력해 주세요.',
};

export const CANCEL_BUTTON = {
  type: 'button',
  className: 'button--secondary',
  content: '취소하기',
};

export const ADD_BUTTON = {
  type: 'submit',
  className: 'button--primary',
  content: '추가하기',
};

export const IMAGE = new Map([
  ['한식', 'category-korean.png'],
  ['중식', 'category-chinese.png'],
  ['일식', 'category-japanese.png'],
  ['양식', 'category-western.png'],
  ['아시안', 'category-asian.png'],
  ['기타', 'category-etc.png'],
]);
