import { CATEGORY, ORDER, TAB } from '../src/constants/SETTING.js';

export interface RestaurantInfo {
  id: number;
  category: CategoryType;
  name: string;
  distance: number;
  description?: string;
  isFavorite: boolean;
  link?: string;
}

export interface FilterParams {
  id: number;
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export interface SortResult {
  originalList: RestaurantInfo[];
  filteredList: RestaurantInfo[];
}

export interface AddRestaurantParams {
  data: RestaurantInfo;
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export interface SortOptionsParams {
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export type OrderType = (typeof ORDER)[keyof typeof ORDER];
export type TabType = (typeof TAB)[keyof typeof TAB];
export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];
