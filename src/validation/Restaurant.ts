import { ERROR_CODE } from './../constants/error';
import { RestaurantInfo } from '../domain/model/LunchRecommendation';
import { CustomError } from './error';
import { handleError, ValidatorOptions } from './index';

const Restaurant = {
  info(
    { name, description, distance, category, link }: RestaurantInfo,
    options?: ValidatorOptions
  ) {
    try {
      const isValid = this.checkName(name);

      return { isValid };
    } catch (error) {
      handleError(error, { onError: options?.onError });

      return { isValid: false };
    }
  },

  checkName(name: unknown) {
    if (typeof name !== 'string') throw new CustomError(ERROR_CODE.NOT_STRING, name);
    if (name.length > 10) throw new CustomError(ERROR_CODE.EXCEED_MAXIMUM_NAME_LENGTH, name);

    return true;
  },
};

export default Restaurant;
