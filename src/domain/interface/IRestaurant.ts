export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type WalkingTime = 5 | 10 | 15 | 20 | 30;

export interface IRestaurant {
  category: Category;
  name: string;
  walkingTime: WalkingTime;
  description?: string;
  link?: string;
}
