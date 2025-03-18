export interface Restaurant {
  id: string;
  category: "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite: boolean;
}
