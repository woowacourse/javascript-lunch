import { Category } from "../../types/RestaurantType";

export const RESTAURANT_NAME_LENGTH_MAX: number = 30;
export const DESCRIPTION_LENGTH_MAX: number = 200;

export const ERROR_MESSAGE: {
  NAME_LENGTH_MAX: string;
  DESCRIPTION_MAX: string;
  LINK: string;
} = {
  NAME_LENGTH_MAX: `가게 이름은 ${RESTAURANT_NAME_LENGTH_MAX}자를 넘을 수 없습니다.`,
  DESCRIPTION_MAX: `설명은 ${DESCRIPTION_LENGTH_MAX}자를 넘을 수 없습니다.`,
  LINK: "유효하지 않은 링크입니다.",
};

export const CATEGORY_DROPDOWN: { value: string; label: Category }[] = [
  {
    value: "",
    label: "선택해 주세요",
  },
  {
    value: "한식",
    label: "한식",
  },
  {
    value: "중식",
    label: "중식",
  },
  {
    value: "일식",
    label: "일식",
  },
  {
    value: "양식",
    label: "양식",
  },
  {
    value: "아시안",
    label: "아시안",
  },
  {
    value: "기타",
    label: "기타",
  },
];

export const CATEGORY_ICON: {
  한식: string;
  중식: string;
  일식: string;
  양식: string;
  아시안: string;
  기타: string;
} = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export const FAVORITE_ICON: {
  true: string;
  false: string;
} = {
  true: "./favorite-icon-filled.png",
  false: "./favorite-icon-lined.png",
};
