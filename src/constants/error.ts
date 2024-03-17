import { MAX_LENGTH_OF_DESCRIPTION } from "./system";

const ERROR_MESSAGE = {
  REQUIRED_CATEGORY: "카테고리를 필수적으로 선택해주세요",
  REQUIRED_NAME: "레스토랑 이름은 필수적으로 작성해주세요",
  DUPLICATE_NAME: "이미 등록된 레스토랑입니다.",
  REQUIRED_DISTANCE: "거리를 필수적으로 선택해주세요",
  INVALID_DESCRIPTION_MAX_LENGTH: `설명의 최대 글자수는 ${MAX_LENGTH_OF_DESCRIPTION}자입니다.`,
  INVALID_LINK: "링크의 형식이 올바르지 않습니다.",
};
export default ERROR_MESSAGE;
