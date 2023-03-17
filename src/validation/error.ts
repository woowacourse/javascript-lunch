import { ErrorCode, ERROR_CODE, ERROR_MESSAGE, ERROR_MESSAGE_FORMAT } from '../constants/error';

const isValidErrorCode = (code: PropertyKey): code is keyof ErrorCode =>
  ERROR_CODE.hasOwnProperty(code);

const getValueByMessageType = (target: ERROR_MESSAGE_FORMAT, payload = {}): ERROR_MESSAGE =>
  typeof target === 'function' ? target(payload) : target;

const errorMessageGenerator = (code: PropertyKey, payload = {}): ERROR_MESSAGE =>
  isValidErrorCode(code)
    ? getValueByMessageType(ERROR_MESSAGE[code], payload)
    : (ERROR_MESSAGE.INVALID_ERROR_CODE as ERROR_MESSAGE);

const errorOptionsGenerator = (code: PropertyKey, value: unknown) =>
  isValidErrorCode(code)
    ? { cause: { code, value } }
    : { cause: { code: ERROR_CODE.INVALID_ERROR_CODE, value: code } };

const createErrorParams = (
  { code, payload }: ErrorInfo,
  value: unknown
): [string, ErrorOptions] => {
  const message = errorMessageGenerator(code, payload);
  const options = errorOptionsGenerator(code, value);

  return [message, options];
};

interface ErrorInfo<T extends {} = {}> {
  code: PropertyKey;
  payload?: T;
}
export class CustomError extends Error {
  constructor(info: ErrorInfo, value?: unknown) {
    super(...createErrorParams(info, value));

    this.name = isValidErrorCode(info.code) ? info.code : ERROR_CODE.INVALID_ERROR_CODE;
  }
}
