export type Restaurant = {
  category: string;
  storeName: string;
  distance: number;
  detail: string;
  link: string;
};

export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
