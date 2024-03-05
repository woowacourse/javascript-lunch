export interface IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
}

export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type Distance = 5 | 10 | 15 | 20 | 30;
