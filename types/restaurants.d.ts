import { CATEGORY, ORDER, TAB } from '../src/constants/SETTING.js';

export interface IRestaurantInfo {
  id?: number;
  category: CategoryType;
  name: string;
  distance: number;
  description?: string;
  isFavorite: boolean;
  link?: string;
}

export interface IFilterParams {
  id: number;
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export interface ISortResult {
  originalList: IRestaurantInfo[];
  filteredList: IRestaurantInfo[];
}

export interface IAddRestaurantParams {
  data: IRestaurantInfo;
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export interface ISortOptionsParams {
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export type OrderType = (typeof ORDER)[keyof typeof ORDER];
export type TabType = (typeof TAB)[keyof typeof TAB];
export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];
