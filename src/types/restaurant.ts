type Category = "전체" | "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Distance = 5 | 10 | 15 | 20 | 30;

type SortingWay = "이름순" | "거리순";

interface RestaurantInfo {
  id: number;
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
  favorite: boolean;
}
