type ERROR_MESSAGE_FORMAT = `[ERROR] ${string}.`;

type CodeToMessage<T> = {
  [key in keyof T]: ERROR_MESSAGE_FORMAT;
};

const UNEXPECTED_ERROR = `[ERROR] Unexpected Error.`;
const INVALID_ERROR_CODE = '[ERROR] 잘못된 에러코드 입니다.';
const NOT_STRING = `[ERROR] 문자열만 입력해 주세요.`;
const EXCEED_MAXIMUM_NAME_LENGTH = `[ERROR] 10글자 이하로 입력해 주세요.`;
const EMPTY_VALUE = `[ERROR] 필수 항목입니다.`;
const INVALID_CATEGORY = `[ERROR] 유효하지 않은 항목 입니다.`;

export const ERROR_CODE = Object.freeze({
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  INVALID_ERROR_CODE: 'INVALID_ERROR_CODE',
  EXCEED_MAXIMUM_NAME_LENGTH: 'EXCEED_MAXIMUM_NAME_LENGTH',
  NOT_STRING: 'NOT_STRING',
  EMPTY_VALUE: 'EMPTY_VALUE',
  INVALID_CATEGORY: 'INVALID_CATEGORY',
});

export const ERROR_MESSAGE: CodeToMessage<typeof ERROR_CODE> = Object.freeze({
  UNEXPECTED_ERROR,
  INVALID_ERROR_CODE,
  EXCEED_MAXIMUM_NAME_LENGTH,
  NOT_STRING,
  EMPTY_VALUE,
  INVALID_CATEGORY,
});

export type ErrorCode = typeof ERROR_CODE;
export type ErrorMessage = typeof ERROR_MESSAGE;
