export const DEFAULT_RESTAURANT_CATEGORY_UI_OPTIONS = Object.freeze([
  { value: '한식', text: '한식' },
  { value: '중식', text: '중식' },
  { value: '일식', text: '일식' },
  { value: '아시안', text: '아시안' },
  { value: '양식', text: '양식' },
  { value: '기타', text: '기타' },
]);

export const ROOT_RESTAURANT_CATEGORY_UI_OPIONS = Object.freeze([
  { value: '전체', text: '전체' },
  ...DEFAULT_RESTAURANT_CATEGORY_UI_OPTIONS,
]);

export const MODAL_RESTAURANT_CATEGORY_UI_OPTIONS = Object.freeze([
  { value: '', text: '선택해주세요' },
  ...DEFAULT_RESTAURANT_CATEGORY_UI_OPTIONS,
]);
