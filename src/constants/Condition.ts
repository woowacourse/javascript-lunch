export const CONDITIONS = Object.freeze({
  DISTANCES: [5, 10, 15, 20, 30],
  SORT_CRITERION: {
    이름순: 'name',
    거리순: 'distance',
  },
});

export const CATEGORIES = {
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
};

export const CATEGORIES_WITH_ALL_KEYS = Object.keys(CATEGORIES_WITH_ALL);
export const CATEGORIES_KEYS = Object.keys(CATEGORIES);
export const SORT_CRITERION_KEYS = Object.keys(CONDITIONS.SORT_CRITERION);
