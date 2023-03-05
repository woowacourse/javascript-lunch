export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "아시안"
  | "양식"
  | "기타";

export type SortMethod = "name" | "distance";

export interface Restaurant {
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
}

export interface Action {
  type: string;
  data?: Restaurant | Category | SortMethod;
}

export interface RestaurantAction {
  ADD_RESTAURANT: string;
  FILTER_BY_CATEGORY: string;
  SORT_RESTAURANTS: string;
}
