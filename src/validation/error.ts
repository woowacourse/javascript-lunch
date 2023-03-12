import { ErrorCode, ERROR_CODE, ERROR_MESSAGE } from '../constants/error';

const isValidErrorCode = (code: PropertyKey): code is keyof ErrorCode =>
  ERROR_CODE.hasOwnProperty(code);

const errorMessageGenerator = (code: PropertyKey) =>
  isValidErrorCode(code) ? ERROR_MESSAGE[code] : ERROR_MESSAGE.INVALID_ERROR_CODE;

const errorOptionsGenerator = (code: PropertyKey, value: unknown) =>
  isValidErrorCode(code)
    ? { cause: { code, value } }
    : { cause: { code: ERROR_CODE.INVALID_ERROR_CODE, value: code } };

const createErrorParams = (code: PropertyKey, value: unknown): [string, ErrorOptions] => {
  const message = errorMessageGenerator(code);
  const options = errorOptionsGenerator(code, value);

  return [message, options];
};

export class CustomError extends Error {
  constructor(code: PropertyKey, value?: unknown) {
    super(...createErrorParams(code, value));

    this.name = isValidErrorCode(code) ? code : ERROR_CODE.INVALID_ERROR_CODE;
  }
}
