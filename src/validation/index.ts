import { ERROR_CODE } from '../constants/error';
import { CustomError } from './error';
import Restaurant from './Restaurant';

export interface ValidatorOptions {
  onError?(error: CustomError): void;
}

export function handleError(error: unknown, { onError }: ValidatorOptions) {
  if (!(error instanceof CustomError)) throw new Error(ERROR_CODE.UNEXPECTED_ERROR);

  if (onError) {
    onError(error);

    return { isValid: false };
  }

  throw error;
}

const Validator = { Restaurant };

export default Validator;
