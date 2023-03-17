export type ERROR_MESSAGE = `[ERROR] ${string}.`;
export type ERROR_MESSAGE_FN = (payload: { [key: string]: unknown }) => ERROR_MESSAGE;
export type ERROR_MESSAGE_FORMAT = ERROR_MESSAGE | ERROR_MESSAGE_FN;

type CodeToMessage<T> = {
  [key in keyof T]: ERROR_MESSAGE_FORMAT;
};

const INVALID_ERROR_CODE = '[ERROR] 잘못된 에러코드 입니다.';
const UNEXPECTED_ERROR = `[ERROR] Unexpected Error.`;
const NOT_STRING = `[ERROR] 문자열만 입력해 주세요.`;
const EMPTY_VALUE = `[ERROR] 필수 항목입니다.`;
const INVALID_CATEGORY = `[ERROR] 유효하지 않은 항목 입니다.`;
const NON_EXISTENT_DATA = `[ERROR] 존재하지 않는 데이터 입니다.`;
const EXCEED_MAXIMUM_NAME_LENGTH: ERROR_MESSAGE_FN = ({ max }) =>
  `[ERROR] ${max}글자 이하로 입력해 주세요.`;

export const ERROR_CODE = Object.freeze({
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  INVALID_ERROR_CODE: 'INVALID_ERROR_CODE',
  NOT_STRING: 'NOT_STRING',
  EMPTY_VALUE: 'EMPTY_VALUE',
  INVALID_CATEGORY: 'INVALID_CATEGORY',
  NON_EXISTENT_DATA: 'NON_EXISTENT_DATA',
  EXCEED_MAXIMUM_NAME_LENGTH: 'EXCEED_MAXIMUM_NAME_LENGTH',
});

export const ERROR_MESSAGE: CodeToMessage<typeof ERROR_CODE> = Object.freeze({
  UNEXPECTED_ERROR,
  INVALID_ERROR_CODE,
  NOT_STRING,
  EMPTY_VALUE,
  INVALID_CATEGORY,
  NON_EXISTENT_DATA,
  EXCEED_MAXIMUM_NAME_LENGTH,
});

export type ErrorCode = typeof ERROR_CODE;
export type ErrorMessage = typeof ERROR_MESSAGE;
