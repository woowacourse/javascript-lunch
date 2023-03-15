import { CATEGORIES, DISTANCES, FILTER_CATEGORIES, SORT_TYPE } from '../constants';

type ArrayLiteral<T extends ReadonlyArray<any>> = T[number];

export type Category = ArrayLiteral<typeof CATEGORIES>;
export type FilterCategory = ArrayLiteral<typeof FILTER_CATEGORIES>;
export type Distance = ArrayLiteral<typeof DISTANCES>;
export type SortType = ArrayLiteral<typeof SORT_TYPE>;

export interface Restaurant {
  id: String;
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
  liked: boolean;
}
