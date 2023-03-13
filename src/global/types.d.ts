export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "양식"
  | "일식"
  | "아시안"
  | "기타";

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantForm {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  id: string;
  favorite: boolean;
}
