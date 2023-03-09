export type CategoryType =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type TakeTimeType = 5 | 10 | 15 | 20 | 30;

export interface RestaurantType {
  category: CategoryType;
  name: string;
  takeTime: TakeTimeType;
  description?: string;
  link?: string;
}
