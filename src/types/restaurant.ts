import type Restaurant from '../Restaurant';

export type TCategory = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type TDistance = 5 | 10 | 15 | 20 | 30;

export interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  referenceLink?: string;
}

export type TRestaurantInstance = InstanceType<typeof Restaurant>;
export type IRestaurantList = TRestaurantInstance[];
