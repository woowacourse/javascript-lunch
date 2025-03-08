export const CATEGORY_ICON = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

export const RESTAURANT_NAME_LENGTH_MAX = 30;
export const DESCRIPTION_LENGTH_MAX = 200;

export const ERROR_MESSAGE = {
  NAME_LENGTH_MAX: `가게 이름은 ${RESTAURANT_NAME_LENGTH_MAX}자를 넘을 수 없습니다.`,
  DESCRIPTION_MAX: `설명은 ${DESCRIPTION_LENGTH_MAX}자를 넘을 수 없습니다.`,
  LINK: "유효하지 않은 링크입니다.",
};

export const CATEGORY_DROPDOWN_LIST = [
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

export const DISTANCE_DROPDOWN_LIST = [
  {
    value: "",
    label: "선택해 주세요",
  },
  {
    value: "5",
    label: "5분 내",
  },
  {
    value: "10",
    label: "10분 내",
  },
  {
    value: "15",
    label: "15분 내",
  },
  {
    value: "20",
    label: "20분 내",
  },
  {
    value: "30",
    label: "30분 내",
  },
];
