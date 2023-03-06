import { CATEGORIES, DISTANCES, SORT_TYPE } from '../constants';

type ArrayLiteral<T extends ReadonlyArray<any>> = T[number];

export type Category = ArrayLiteral<typeof CATEGORIES>;
export type Distance = ArrayLiteral<typeof DISTANCES>;
export type SortType = ArrayLiteral<typeof SORT_TYPE>;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
}
