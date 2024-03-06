import CONDITIONS from '../constants/Condition';

export interface IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
}

export type Category = (typeof CONDITIONS.CATEGORIES)[number];

export type Distance = (typeof CONDITIONS.DISTANCES)[number];

export type SortCriteria = (typeof CONDITIONS.SORT_CRITERION)[number];
