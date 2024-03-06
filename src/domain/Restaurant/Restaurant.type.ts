export interface RestaurantDetail {
  category: MenuCategory;
  name: string;
  distance: Distance;
  description?: string;
  url?: string;
}

export type MenuCategory =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";

export type Distance = 5 | 10 | 15 | 20 | 30;
