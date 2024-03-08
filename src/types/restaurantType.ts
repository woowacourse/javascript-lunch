import { CategoryEnum } from '../constants';

export type Category = keyof typeof CategoryEnum;

export type Distance = 5 | 10 | 15 | 20 | 30;

export type RestaurantInfoKey =
  | 'category'
  | 'name'
  | 'distance'
  | 'description'
  | 'link'
  | 'like';

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  like?: boolean;
}
