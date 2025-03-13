const RULES = Object.freeze({
  MAX_RESTAURANT_NAME: 15,
  MIN_RESTAURANT_NAME: 1,
  DISTANCES: Object.freeze([5, 10, 15, 20, 30]),
  MAX_DESCRIPTION_TEXT_LENGTH: 300,
  CATEGORIES: Object.freeze(["한식", "중식", "일식", "양식", "아시안", "기타"]),
  ALL_CATEGORY: "전체",
  SORTING: Object.freeze(["name", "distance"]),
  DELETE_MESSAGE: "정말 삭제하시겠습니까?",
});

export default RULES;
