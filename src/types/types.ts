export type category =
  | ""
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type distance = 5 | 10 | 15 | 20 | 30;
export type sort = "" | "name" | "distance";

export interface IRestaurant {
  categoryIcon: string;
  categoryTitle: category;
  distance: distance;
  id: string;
  name: string;
  isFavorite: boolean;
  link?: string;
  description?: string;
}
