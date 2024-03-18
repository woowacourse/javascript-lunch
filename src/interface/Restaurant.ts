export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type WalkingTime = 5 | 10 | 15 | 20 | 30;
export type localKey = 'restaurants' | 'favoriteRestaurants';

export interface Restaurant {
  category: Category;
  name: string;
  walkingTime: WalkingTime;
  description?: string;
  link?: string;
}

export interface Message {
  [key: string]: string;
}
