export type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  id: string;
  category: Category;
  name: string;
  distance: Distance;
  like: boolean;
  description?: string;
  link?: string;
}
