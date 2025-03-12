import { CATEGORIES, SORTS, FILTERS } from './constants';

export type TabType = 'all' | 'like';

export type SortType = (typeof SORTS)[number];
export type CategoryType = (typeof CATEGORIES)[number];
export type FilterType = (typeof FILTERS)[number];
export type DistanceType = 5 | 10 | 15 | 20 | 30;

export type RestaurantType = {
  id: string;
  name: string;
  description: string;
  distance: DistanceType;
  category: CategoryType;
  isLike: boolean;
  url: string;
};

export type HTMLType = 'HTMLType';
