import { Categories } from "../../types/global";

export const categoryValue: Categories = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  etc: "기타",
};

export const label: Record<string, string> = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크",
};

export const categoryFilterValue = {
  전체: "전체",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
};

export const sortingValue = {
  name: "이름순",
  distance: "거리순",
};
