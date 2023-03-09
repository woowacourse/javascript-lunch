import { NAME_LENGTH } from '../constants/values';
import { ERROR_MESSAGE } from '../constants/error';
import { REGEX_SPECIAL_CHARACTERS } from '../constants/regexp';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/values';
import { RestaurantType } from '../type';

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

export const checkDuplicateNameInRestaurantList = (input: string) => {
  const restaurantList = getListOnLocalStorage(
    LOCAL_STORAGE_KEY
  ) as RestaurantType[];

  if (restaurantList.find(restaurant => restaurant.name === input)) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_NAME);
  }
};
