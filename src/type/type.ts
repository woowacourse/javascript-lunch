export interface Attribute {
  id: string;
  className: string;
  name: string;
  required?: boolean;
}

export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
type TakingTime = 5 | 10 | 15 | 20 | 25 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  takingTime: TakingTime;
  description?: string;
  link?: string;
}
