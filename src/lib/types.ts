import { CATEGORIES, SORTS, FILTERS, LOCAL_STORAGE_KEY_MAP } from './constants';

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

export type LocalStorageKeyType = keyof typeof LOCAL_STORAGE_KEY_MAP;
