export type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
};

const Distance = {
  Five: 5,
  Ten: 10,
  Fifteen: 15,
  Twenty: 20,
  Thirty: 30
} as const;
export type Distance = (typeof Distance)[keyof typeof Distance];

export const CATEGORY = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  asian: '아시안',
  western: '양식',
  etc: '기타'
} as const;

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export const SORTING_KEY = {
  name: '이름순',
  distance: '거리순'
} as const;

export type SortingKey = (typeof SORTING_KEY)[keyof typeof SORTING_KEY];

export const DEFAULT = {
  category: CATEGORY.all,
  sortingKey: SORTING_KEY.name
};

export const EVENT = {
  changedFilter: 'changedFilter',
  clickedGNBButton: 'clickedGNBButton',
  clickedModalSubmitButton: 'clickedModalSubmitButton',
  clickedModalResetButton: 'clickedModalResetButton'
};
