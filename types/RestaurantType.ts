export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

export type distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  favorite: boolean;
}
