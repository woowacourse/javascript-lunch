export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type Distance = 5 | 10 | 15 | 20 | 30;

export type State = { filter: string; sort: string; restaurants: RestaurantValues[] };

export interface RestaurantValues {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}
