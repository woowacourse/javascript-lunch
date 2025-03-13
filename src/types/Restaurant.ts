export interface IRestaurant {
  name: string;
  distance: number;
  description: string;
  category: "한식" | "중식" | "일식" | "양식" | "아시안" | "양식" | "기타";
  url?: string;
}
