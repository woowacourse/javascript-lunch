export type CategoryType = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
export type DistanceType = "5분" | "10분" | "15분" | "20분" | "30분";

export interface FoodItemType {
  id: string;
  category: string;
  name: string;
  distance: string;
  description: string;
  isFavorite: boolean;
  link: string;
}
