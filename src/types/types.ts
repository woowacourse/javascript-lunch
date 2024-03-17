import { CATEGORY, SORTING } from '../constants';

export type CategoryFilterType = keyof typeof CATEGORY;
export type Category = Exclude<CategoryFilterType, 'all'>;

export type CategoryValues = (typeof CATEGORY)[keyof typeof CATEGORY];
export type CategoryFilterValues = Exclude<(typeof CATEGORY)[keyof typeof CATEGORY], '전체'>;

export type SortingValues = (typeof SORTING)[keyof typeof SORTING];
export type SortingFilterType = keyof typeof SORTING;

export type RestaurantInfo = {
  category: CategoryValues;
  name: string;
  distance: number;
  isFavorite: boolean;
  description?: string;
  link?: string;
};
