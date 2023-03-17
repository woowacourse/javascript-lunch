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
  favorite: 0 | 1;
  key?: number;
}

export interface CustomElement extends HTMLElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: (data: Restaurant[] | Restaurant | Category | SortMethod) => void;
}

export type Index = number;

export type MenuTap = "total" | "favorite";

export interface Action {
  type: string;
  data: Restaurant | Category | SortMethod | Index | MenuTap;
}

export interface RestaurantAction {
  ADD_RESTAURANT: string;
  FILTER_BY_CATEGORY: string;
  SORT_RESTAURANTS: string;
  UPDATE_FAVORITE: string;
  SHOW_DETAIL: string;
  UPDATE_MODAL_FAVORITE: string;
  DELETE_RESTAURANT: string;
  CHANGE_MENU: string;
}
