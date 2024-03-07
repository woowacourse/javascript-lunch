export const SELECTED_DATA = {
  sorting: {
    id: 'sorting-filter',
    name: 'sorting',
    options: {
      name: '이름순',
      distance: '거리순',
    },
  },
  category: {
    id: 'category-filter',
    name: 'category',
    options: {
      전체: '전체',
      한식: '한식',
      중식: '중식',
      일식: '일식',
      양식: '양식',
      아시안: '아시안',
      기타: '기타',
    },
  },
};

export const RULES = {
  requiredIds: ['category', 'name', 'distance'],
};
