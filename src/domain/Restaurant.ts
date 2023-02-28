export type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

export default interface Restaurant {
  category: Category;
  name: string;
  distance: number;
  describe?: string;
  referenceLink?: string;
}
