type RulesType = {
  [key: string]: string[];
};

export const RULES: RulesType = {
  requiredIds: ['category', 'name', 'distance'],
  selectIds: ['sorting-filter', 'category-filter'],
};

type ConvertType = {
  [key: string]: string;
};

export const CONVERT: ConvertType = {
  name: '이름',
  category: '카테고리',
  distance: '거리',
};
