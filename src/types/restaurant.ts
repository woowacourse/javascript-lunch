export type Restaurant = {
  id?: string;
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link?: string;
  isFavorite?: boolean;
};

export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

export type Distance = 5 | 10 | 15 | 20 | 25 | 30;

export type SortType = "이름순" | "거리순";
