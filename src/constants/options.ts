type CategoryOption = {
  value: "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  text: string;
};

type DistanceOption = {
  value: 5 | 10 | 15 | 20 | 30;
  text: string;
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "한식", text: "한식" },
  { value: "중식", text: "중식" },
  { value: "일식", text: "일식" },
  { value: "양식", text: "양식" },
  { value: "아시안", text: "아시안" },
  { value: "기타", text: "기타" },
] as const;

export const DISTANCE_OPTIONS: DistanceOption[] = [
  { value: 5, text: "5분 내" },
  { value: 10, text: "10분 내" },
  { value: 15, text: "15분 내" },
  { value: 20, text: "20분 내" },
  { value: 30, text: "30분 내" },
] as const;
