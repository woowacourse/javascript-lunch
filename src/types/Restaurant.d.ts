import { CATEGORIES, CONDITIONS } from '@/constants/Condition';
export interface IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
}

export type Category = keyof typeof CATEGORIES;
export type RequiredCategoriesKeys = '선택해주세요' | CategoryKey;

export type Distance = (typeof CONDITIONS.DISTANCES)[number];
export type RequiredDistanceKeys = '선택해주세요' | Distance;

export type SortCriteria = keyof typeof CONDITIONS.SORT_CRITERION;
