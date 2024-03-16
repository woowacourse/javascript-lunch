export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타' | '전체';
export type Distance = 5 | 10 | 15 | 20 | 30;
export type Option = 'name' | 'distance';

export interface Restaurant {
  id: number;
  name: string;
  isBookmark: boolean;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
}

export interface FilterOptions {
  category: Category;
  sort: Option;
}
