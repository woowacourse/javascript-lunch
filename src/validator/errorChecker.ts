import { NAME_LENGTH } from '../constants/values';
import { ERROR_MESSAGE } from '../constants/error';
import { REGEX_SPECIAL_CHARACTERS } from '../constants/regexp';
import { getAllDataOnLocalStorage } from '../utils/localStorage';

const { MIN, MAX } = NAME_LENGTH;

export const checkRestaurantName = (input: string) => {
  if (REGEX_SPECIAL_CHARACTERS.test(input)) {
    throw new Error(ERROR_MESSAGE.NO_SPECIAL_CHARACTERS);
  }
};

export const checkInputLength = (input: string) => {
  if (input.length < MIN || input.length > MAX) {
    throw new Error(ERROR_MESSAGE.NAME_LENGTH_LIMIT);
  }
};

export const checkDuplicate = (input: string) => {
  if (
    getAllDataOnLocalStorage().filter(restaurant => restaurant.name === input)
      .length
  ) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_NAME);
  }
};
