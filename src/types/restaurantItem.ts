export type RestaurantItem = {
  category: "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  name: string;
  dist: string;
  description?: string;
  link?: string;
};
