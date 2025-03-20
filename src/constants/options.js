export const DISTANCE_OPTIONS = [
  { value: "", text: "선택해 주세요" },
  { value: "5", text: "5분 내" },
  { value: "10", text: "10분 내" },
  { value: "15", text: "15분 내" },
  { value: "20", text: "20분 내" },
  { value: "30", text: "30분 내" },
];

export const CATEGORY_OPTIONS = [
  { value: "", text: "선택해 주세요" },
  { value: "korean", text: "한식" },
  { value: "chinese", text: "중식" },
  { value: "japanese", text: "일식" },
  { value: "western", text: "양식" },
  { value: "asian", text: "아시안" },
  { value: "etc", text: "기타" },
];

export const CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "korean", label: "한식" },
  { value: "chinese", label: "중식" },
  { value: "japanese", label: "일식" },
  { value: "western", label: "양식" },
  { value: "asian", label: "아시안" },
  { value: "etc", label: "기타" },
];

export const SORTING_FILTER_OPTIONS = [
  { value: "name", label: "이름순" },
  { value: "distance", label: "거리순" },
];

export const SORTING_DEFAULT = "name";
export const CATEGORY_DEFAULT = "all";
