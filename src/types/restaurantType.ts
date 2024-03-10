import { CATEGORY } from '../constants/index.ts';

export type Category = keyof typeof CATEGORY;

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  like?: boolean;
}

export type RestaurantInfoKey = keyof RestaurantInfo;
