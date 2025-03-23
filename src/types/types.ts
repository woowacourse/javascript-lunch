export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
export type Distance = 5 | 10 | 15 | 20 | 30;
export type Sort = "" | "name" | "distance";

export interface IRestaurant {
  category: Category;
  distance: Distance;
  id: string;
  name: string;
  isFavorite: boolean;
  link?: string;
  description?: string;
}
export interface EventType {
  eventType: string;
  eventHandler: (e: Event) => void;
}
export interface FormEventType {
  eventType: string;
  eventHandler: () => void;
}
