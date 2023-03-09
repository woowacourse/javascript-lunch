export interface SelectAttribute {
  id: string;
  className?: string;
  name: string;
  required?: boolean;
}

export type Category =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type TakingTime = 5 | 10 | 15 | 20 | 25 | 30;
export type Sort = "이름순" | "거리순";
export type PageTabOption = "every" | "bookmarked";

export interface Object {
  [key: string]: string;
}

export interface Restaurant {
  id: string;
  category: Category;
  name: string;
  takingTime: TakingTime;
  bookmarked: boolean;
  description?: string;
  link?: string;
}

export type SetSelectedValue = (
  sortId: string,
  selectedValue: Category | Sort
) => void;

export type AddRestaurant = (restaurant: Restaurant) => void;
export type HandleWithId = (id: string) => void;
export type HandleWithPage = (page: PageTabOption) => void;
export type Rerender = () => void;
