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
};

export const LINK = {
  label: '참고 링크',
  name: 'link',
  helpText: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
  required: '',
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

export const RESTAURANTS = [
  {
    category: `${CATEGORY.lists.get('KOREAN')}`,
    name: '피양콩할마니',
    distance: '10분 내',
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조건강식을 선보인다. 콩비이곳의 대표메뉴지만, 할머니가 옛날만들어내는 비지전골 또한느낄 수 있는 특별한메뉴다. 반찬은 손님들이덜어 먹을 수 있게 준비돼 있다.',
    link: '',
  },
  {
    category: `${CATEGORY.lists.get('CHINESE')}`,
    name: '친친',
    distance: '5분 내',
    description: 'Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다',
    link: '',
  },
  {
    category: `${CATEGORY.lists.get('JAPANESE')}`,
    name: '잇쇼우',
    distance: '10분 내',
    description:
      '잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다',
    link: '',
  },
  {
    category: `${CATEGORY.lists.get('WESTERN')}`,
    name: '이태리키친',
    distance: '20분 내',
    description: '늘 변화를 추구하는 이태리키친입니다.',
    link: '',
  },
  {
    category: `${CATEGORY.lists.get('ASIAN')}`,
    name: '호아빈 삼성점',
    distance: '15분 내',
    description: '푸짐한 양에 국물이 일품인 쌀국수',
    link: '',
  },
  {
    category: `${CATEGORY.lists.get('ETC')}`,
    name: '도스타코스 선릉점',
    distance: '5분 내',
    description: '멕시칸 캐주얼 그릴',
    link: '',
  },
];

export const IMAGE = new Map([
  ['한식', '/category-korean.png'],
  ['중식', '/category-chinese.png'],
  ['일식', '/category-japanese.png'],
  ['양식', '/category-western.png'],
  ['아시안', '/category-asian.png'],
  ['기타', '/category-etc.png'],
]);
