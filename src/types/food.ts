export type CategoryType = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
export type DistanceType = "5" | "10" | "15" | "20" | "30";

export interface FoodItemType {
  id: string;
  category: CategoryType;
  name: string;
  distance: DistanceType;
  description: string;
  isFavorite: boolean;
  link: string;
}

export interface FoodFormType {
  category: CategoryType;
  name: string;
  distance: string;
  description?: string;
  link?: string;
}
