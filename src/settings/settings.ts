export const FOOD_CATEGORY = [
  { value: "한식", text: "한식" },
  { value: "중식", text: "중식" },
  { value: "일식", text: "일식" },
  { value: "아시안", text: "아시안" },
  { value: "양식", text: "양식" },
  { value: "기타", text: "기타" },
] as const;

export const FOOD_CATEGORY_FILTER = [
  {
    value: "전체",
    text: "전체",
  },
  ...FOOD_CATEGORY,
] as const;

export const SORTED_OPTION = [
  {
    value: "name",
    text: "이름순",
  },
  {
    value: "distance",
    text: "거리순",
  },
];

export const RESTAURANT_DISTANCE = [
  { value: 5, text: "5분 내" },
  { value: 10, text: "10분 내" },
  { value: 15, text: "15분 내" },
  { value: 20, text: "20분 내" },
  { value: 30, text: "30분 내" },
] as const;

export const RESTAURANT_FIELD_LENGTH = {
  name: { min: 1, max: 12 },
  description: { min: 0, max: 300 },
  link: { min: 0, max: 300 },
} as const;

export const ERROR_MESSAGE = {
  INVALID_CATEGORY: "존재하지 않는 카테고리 입니다.",
  INVALID_RESTAURANT_NAME_LENGTH: `음식점 이름은 ${RESTAURANT_FIELD_LENGTH.name.min}글자 이상, ${RESTAURANT_FIELD_LENGTH.name.max}글자 이하만 가능합니다.`,
  INVALID_RESTAURANT_DISTANCE: "음식점 거리가 유효하지 않습니다.",
  INVALID_RESTAURANT_DESCRIPTION_LENGTH: `음식점 설명은 ${RESTAURANT_FIELD_LENGTH.description.max}이하만 가능합니다.`,
  INVALID_RESTAURANT_LINK_LENGTH: `움식점 링크는 ${RESTAURANT_FIELD_LENGTH.link.max}이하만 가능합니다.`,
} as const;

export const STORAGE_KEY = {
  RESTAURANTS: "restaurants",
} as const;
