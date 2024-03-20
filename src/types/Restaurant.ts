import { CATEGORIES, CONDITIONS } from '@/constants/Condition';

export interface IRestaurantInfo {
  id: number;
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
}

export interface IRestaurant extends IRestaurantInfo {
  isFavorite: boolean;
}

export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type AllAndCategory = '전체' | Category;

export type Distance = (typeof CONDITIONS.DISTANCES)[number];

export type SortCriteria = keyof typeof CONDITIONS.SORT_CRITERION;
