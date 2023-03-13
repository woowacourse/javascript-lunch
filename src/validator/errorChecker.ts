import { getListOnLocalStorage } from '../utils/localStorage';
import { RestaurantType } from '../type/types';
import { NAME_LENGTH } from '../constants/values';
import { ERROR_MESSAGE } from '../constants/error';
import { REGEX_SPECIAL_CHARACTERS } from '../constants/regexp';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

export const checkRestaurantName = (input: string) => {
  if (REGEX_SPECIAL_CHARACTERS.test(input)) {
    throw new Error(ERROR_MESSAGE.NO_SPECIAL_CHARACTERS);
  }
};

export const checkInputLength = (input: string) => {
  if (input.length < NAME_LENGTH.MIN || input.length > NAME_LENGTH.MAX) {
    throw new Error(ERROR_MESSAGE.NAME_LENGTH_LIMIT);
  }
};

export const checkDuplicateNameInRestaurantList = (input: string) => {
  const restaurantList = getListOnLocalStorage(
    LOCAL_STORAGE_KEY.RESTAURANT_LIST
  ) as RestaurantType[];

  if (restaurantList.find(restaurant => restaurant.name === input)) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_NAME);
  }
};
