export const CONDITIONS = Object.freeze({
  DISTANCES: [5, 10, 15, 20, 30],
  SORT_CRITERION: ['이름순', '거리순'],
});

export const CATEGORIES: { [key: string]: string } = {
  한식: 'korean',
  중식: 'chinese',
  일식: 'japanese',
  아시안: 'asian',
  양식: 'western',
  기타: 'etc',
} as const;
