import {
  ERROR_MESSAGE,
  NAME_LENGTH,
  REGEX_SPECIAL_CHARACTERS,
} from '../constants';
import { getAllDataOnLocalStorage } from '../utils/localStorage';

const { NO_SPECIAL_CHARACTERS, NAME_LENGTH_LIMIT, DUPLICATE_NAME } =
  ERROR_MESSAGE;
const { MIN, MAX } = NAME_LENGTH;

export const checkRestaurantName = (input: string) => {
  if (REGEX_SPECIAL_CHARACTERS.test(input)) {
    throw new Error(NO_SPECIAL_CHARACTERS);
  }
};

export const checkInputLength = (input: string) => {
  if (input.length < MIN || input.length > MAX) {
    throw new Error(NAME_LENGTH_LIMIT);
  }
};

export const checkDuplicate = (input: string) => {
  if (
    getAllDataOnLocalStorage().filter(restaurant => restaurant.name === input)
      .length
  ) {
    throw new Error(DUPLICATE_NAME);
  }
};
