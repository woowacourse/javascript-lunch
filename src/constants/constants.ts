export const REGEX = {
  VALID_URL:
    /^((ftp|http|https):\/\/)?([a-zA-Z0-9]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})(:[0-9]+)?(\/.*)?$/,
  VALID_NAME: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣㅑ-ㅣㅠ-ㅣ0-9!@#$%^&*?'\",. ]+$/,
};

export const ERROR_MESSAGE = {
  EMPTY_CATEGORY: "카테고리를 선택해 주세요.",
  EMPTY_DISTANCE: "거리를 선택해 주세요.",
  INVALID_NAME: `음식점 이름은 한글, 영어, 숫자, !@#$%^&*?'",.만 포함하여 입력해 주세요.`,
  INVALID_LINK: "유효한 링크를 입력해 주세요.",
};
