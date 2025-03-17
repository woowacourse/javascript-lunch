export type CategoryType =
  | "한식"
  | "중식"
  | "일식"
  | "아시안"
  | "양식"
  | "기타";

export interface RestaurantProp {
  id?: number | string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  category: CategoryType;
  isFavorite?: boolean;
  src?: string;
  alt?: string;
}
