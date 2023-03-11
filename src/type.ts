type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

type Distance = "5" | "10" | "15" | "20" | "30";

type Favorite = "none" | "favorite";

export interface RestaurantType {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  link: string;
  favorite: Favorite;
}

export type CategoryOptionType = Category | "전체";

export type SortType = "name" | "distance";

export interface EventListenerType {
  type: string;
  listener: (event: Event) => void;
}
