import { CATEGORIES, CONDITIONS } from '@/constants/Condition';
export interface IRestaurant {
  name: string;
  distance: DistanceNumeric;
  category: Category;
  description?: string;
  link?: string;
  isFavorite?: boolean;
}

export type Category = keyof typeof CATEGORIES;
export type CategoryOrPlaceholder = '선택해주세요' | Category;
export type CategoryOrAll = '전체' | Category;

export type DistanceNumeric = (typeof CONDITIONS.DISTANCES)[number];
export type NumberToString<T> = T extends number ? `${T}` : never;

export type DistanceOrPlaceholder = '선택해주세요' | NumberToString<DistanceNumeric>;
export type SortCriteria = keyof typeof CONDITIONS.SORT_CRITERION;
