import { deepFreeze } from "../utils/deepFreeze";

const _categoryOptions = {
  "선택해 주세요": "",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
} as const;

const _distanceOptions = {
  "선택해 주세요": "",
  "5분 이내": 5,
  "10분 이내": 10,
  "15분 이내": 15,
  "20분 이내": 20,
  "30분 이내": 30,
} as const;
 
export const categoryOptions = deepFreeze(_categoryOptions) satisfies Record<string, string>;
export const distanceOptions = deepFreeze(_distanceOptions) satisfies Record<string, string | number>;