export interface categorySortFilterType {
  name: "category" | "sorting";
  id: "category-filter" | "sorting-filter";
  options: string[];
  className: "restaurant-filter";
}

export interface headerContentType {
  TITLE: string;
  LABEL: string;
}

export interface tabDataType {
  id: "all-restaurant" | "favorite-restaurant";
  text: "모든 음식점" | "자주 가는 음식점";
}

export type updateListViewType = (category: string, sorting: string) => void;
