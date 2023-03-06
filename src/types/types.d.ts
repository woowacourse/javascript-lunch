export type Category = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type Distance = 5 | 10 | 15 | 20 | 30;
export type SortingCriterion = 'name' | 'distance';

export type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
};

export type Errors = {
  [key: string]: Boolean;
};
