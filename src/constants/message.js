import { deepFreeze } from "../utils/deepFreeze.js";

export const ERROR = deepFreeze({
  INVALID_REQUIRED: "(은)는 필수 값입니다.",
  INVALID_URL: "유효한 URL이 아닙니다.",
});

export const USER_MESSAGE = deepFreeze({
  CONFIRM_DELETE:
    "정말로 삭제하시겠습니까? \n삭제하실 경우 다시 복구가 어렵습니다.",
});
