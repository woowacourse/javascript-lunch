export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type MinutesToCampus = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: MinutesToCampus;
  description?: string;
  link?: string;
}
