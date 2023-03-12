export const CATEGORY: Category[] = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

export const SORTING = ["이름순", "거리순"];
export const TAKING_TIME = [
  "5분 이내",
  "10분 이내",
  "15분 이내",
  "20분 이내",
  "30분 이내",
];

export const CategoryFilterAttribute: SelectAttribute = {
  name: "category",
  id: "category-filter",
  className: "restaurant-filter",
};

export const SortingFilterAttribute: SelectAttribute = {
  name: "sorting",
  id: "sorting-filter",
  className: "restaurant-filter",
};

export const CategorySelectAttribute: SelectAttribute = {
  name: "category",
  id: "category",
  required: true,
};

export const TakingTimeSelectAttribute: SelectAttribute = {
  name: "takingTime",
  id: "takingTime",
  required: true,
};
