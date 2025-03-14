export const LABEL_KEYS = Object.freeze({
  category: "category",
  name: "name",
  distance: "distance",
  description: "description",
  link: "link",
});

export const LABEL_NAMES = Object.freeze({
  [LABEL_KEYS.category]: "카테고리",
  [LABEL_KEYS.name]: "이름",
  [LABEL_KEYS.distance]: "거리(도보 이동 시간)",
  [LABEL_KEYS.description]: "설명",
  [LABEL_KEYS.link]: "참고 링크",
});

export const NAV_BAR_KEYS = Object.freeze({
  all: "all",
  favorite: "favorite",
});

export const NAV_BAR_OPTIONS = Object.freeze({
  [NAV_BAR_KEYS.all]: "모든 음식점",
  [NAV_BAR_KEYS.favorite]: "자주 가는 음식점",
});

export const SORT_OPTIONS = Object.freeze({
  [LABEL_KEYS.name]: "이름순",
  [LABEL_KEYS.distance]: "거리순",
});

export const DISTANCE = ["5", "10", "15", "20", "30"];
export const CATEGORY = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

export const CATEGORY_ASSETS = Object.freeze({
  한식: "./assets/category-korean.png",
  중식: "./assets/category-chinese.png",
  일식: "./assets/category-japanese.png",
  양식: "./assets/category-western.png",
  아시안: "./assets/category-asian.png",
  기타: "./assets/category-etc.png",
});

export const FAVORITE_ASSETS = Object.freeze({
  filled: "./assets/favorite-icon-filled.png",
  lined: "./assets/favorite-icon-lined.png",
});

export const EVENT_TYPES = Object.freeze({
  click: "click",
  submit: "submit",
  change: "change",
});

export const BUTTON_TYPES = Object.freeze({
  add: "add",
  cancel: "cancel",
  delete: "delete",
  close: "close",
});

export const BUTTON_TEXTS = Object.freeze({
  [BUTTON_TYPES.add]: "추가하기",
  [BUTTON_TYPES.cancel]: "취소하기",
  [BUTTON_TYPES.delete]: "삭제하기",
  [BUTTON_TYPES.close]: "닫기",
});
