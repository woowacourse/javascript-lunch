export const RULES = {
  requiredIds: ['category', 'name', 'distance'],
  selectIds: ['sorting-filter', 'category-filter'],
} as const;

export const CONVERT = {
  name: '이름',
  category: '카테고리',
  distance: '거리',
} as const;

export const STORAGE_KEY = {
  restaurantData: 'restaurants',
  sortingFilter: 'sorting-filter',
  categoryFilter: 'category-filter',
} as const;

export const DEFAULT = {
  sortingFilter: 'name',
  categoryFilter: '전체',
} as const;
