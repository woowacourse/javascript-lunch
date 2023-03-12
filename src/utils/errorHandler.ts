import { ERROR_MESSAGE } from './constants';

const errorHandler = {
  doesNotExistElement: () => {
    throw new Error(ERROR_MESSAGE.notExsitElement);
  },

  doseNotExistRestaurant: () => {
    throw new Error(ERROR_MESSAGE.notExistRestaurant);
  },
};

export default errorHandler;
