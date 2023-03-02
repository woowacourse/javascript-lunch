export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

export type CategoryFilter = '전체' | Category;
