export type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

export type SortMethod = "이름순" | "거리순";

export interface Restaurant {
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
}

export interface CustomElement extends HTMLElement {
  render: () => void;
  template: () => string;
  setEvent: () => void;
  show: () => void;
  hide: () => void;
  rerender: (data: Restaurant[]) => void;
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
