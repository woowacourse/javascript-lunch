export interface IRestaurantInfo {
  id?: number;
  category: string;
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
  data: Omit<IRestaurantInfo, 'id'> & { id?: number };
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export interface ISortOptionsParams {
  tab: TabType;
  order: OrderType;
  category: CategoryType;
}

export type OrderType = '이름순' | '거리순';
export type TabType = 'all' | 'favorite';
export type CategoryType = '전체' | '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
