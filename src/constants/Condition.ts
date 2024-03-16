import { Category } from '@/types/Restaurant';

export const CONDITIONS = {
  DISTANCES: [5, 10, 15, 20, 30],
  SORT_CRITERION: {
    이름순: 'name',
    거리순: 'distance',
  },
} as const;

export const CATEGORIES: Record<Category, string> = {
  한식: 'korean',
  중식: 'chinese',
  일식: 'japanese',
  아시안: 'asian',
  양식: 'western',
  기타: 'etc',
} as const;

export const CATEGORIES_WITH_ALL: { [key: string]: string } = {
  전체: 'all',
  ...CATEGORIES,
} as const;

export const CATEGORIES_WITH_ALL_KEYS = Object.keys(CATEGORIES_WITH_ALL);
export const CATEGORIES_KEYS = Object.keys(CATEGORIES);
export const SORT_CRITERION_KEYS = Object.keys(CONDITIONS.SORT_CRITERION);

export const CATEGORIES_KEYS_REQUIRED = ['선택해주세요', ...CATEGORIES_KEYS];

export const DISTANCES_REQURIED_VALUES = [
  '선택해주세요',
  ...CONDITIONS.DISTANCES.map((num) => String(num)),
];
export const DISTANCES_REQURIED_TEXT = [
  '선택해주세요',
  ...CONDITIONS.DISTANCES.map((num) => `${String(num)}분 내`),
];

export const RESTAURANTS_DB_KEY = 'restaurants';

export const DISTANCE_FROM_CAMPUS = (distance: number) => `캠퍼스부터 ${distance}분 내`;
