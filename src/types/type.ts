export interface Attribute {
  id: string;
  className?: string;
  name: string;
  required?: boolean;
}

export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
export type TakingTime = "5" | "10" | "15" | "20" | "25" | "30";
export type Sort = "이름순" | "거리순";

export interface Restaurant {
  id: string;
  name: string;
  takingTime: string;
  category: string;
  bookMark: boolean;
  link?: string;
  description?: string;
}

export type RerenderListType = (
  id: string,
  selectedValue: Category | Sort
) => void;
