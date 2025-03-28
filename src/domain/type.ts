export type FoodCategory = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
export type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantInformation {
  id: string;
  category: FoodCategory;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  favorites?: boolean;
}
