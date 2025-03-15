export interface RestaurantValue {
  category: Category;
  name: NameOrDistance;
  distance: Distance;
  description: string;
  link: string;
  isFavorite: boolean;
}

export type Category =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타"
  | "";

export type Distance = 5 | 10 | 15 | 20 | 30;

export type NameOrDistance = "name" | "distance" | "";

export type TabInfo = "all" | "favorite";
