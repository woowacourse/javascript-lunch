const TYPE_SETTING = {
  category: ['한식', '중식', '일식', '양식', '아시안', '기타'] as const,
  minutesWalk: [5, 10, 15, 20, 30] as const,
  sort: ['이름순', '거리순'] as const,
};

const ASSETS = {
  imageUrl: {
    버튼_음식점추가: require('/src/assets/image/add-button.png').default,
    한식: require('/src/assets/image/category-korean.png').default,
    중식: require('/src/assets/image/category-chinese.png').default,
    일식: require('/src/assets/image/category-japanese.png').default,
    양식: require('/src/assets/image/category-western.png').default,
    아시안: require('/src/assets/image/category-asian.png').default,
    기타: require('/src/assets/image/category-etc.png').default,
  },
};
export { TYPE_SETTING, ASSETS };
