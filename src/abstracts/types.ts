export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "아시안"
  | "양식"
  | "기타";

export type SortMethod = "name" | "distance";

export interface AddRestaurant {
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

export interface Restaurant extends AddRestaurant {
  id: number;
}

export interface Action {
  type: string;
  data?: Restaurant | Category | SortMethod | boolean | number;
}

export type LocalArrayData = Restaurant[];

export interface RestaurantAction {
  ADD_RESTAURANT: string;
  HANDLE_FAVORITE: string;
  FILTER_BY_CATEGORY: string;
  SORT_RESTAURANTS: string;
}

export interface ModalAction {
  MODAL_ON: string;
  MODAL_OFF: string;
}

export interface MenuAction {
  MENU_ALL: string;
  MENU_FAVORITE: string;
}
