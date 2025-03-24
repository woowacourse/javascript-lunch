export const SELECT_OPTIONS = {
  distance: [
    { value: "", label: "선택해 주세요" },
    { value: "5", label: "5분 내" },
    { value: "10", label: "10분 내" },
    { value: "15", label: "15분 내" },
    { value: "20", label: "20분 내" },
    { value: "30", label: "30분 내" },
  ],
  category: [
    { value: "", label: "선택해 주세요" },
    { value: "korean", label: "한식" },
    { value: "chinese", label: "중식" },
    { value: "japanese", label: "일식" },
    { value: "western", label: "양식" },
    { value: "asian", label: "아시안" },
    { value: "etc", label: "기타" },
  ],
  sortOption: [
    { value: "name", label: "이름순" },
    { value: "distance", label: "거리순" },
  ],
};

SELECT_OPTIONS.sortCategory = SELECT_OPTIONS.category.map((option, index) =>
  index === 0 ? { ...option, label: "전체" } : option
);
