export const ERRORS = Object.freeze({
  EMPTY_NAME: "이름은 공백일 수 없습니다.",
  MAXIMUM_NAME: "이름은 30자를 넘길 수 없습니다.",
  MAXIMUM_DESCRIPTION: "설명은 1500자를 넘길 수 없습니다.",
  NON_SELECTED(category) {
    return `${category} 중 하나를 선택해야 합니다.`;
  },
});
