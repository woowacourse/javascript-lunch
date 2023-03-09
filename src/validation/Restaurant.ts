import { ERROR_CODE } from './../constants/error';
import { RestaurantInfo } from '../domain/model/LunchRecommendation';
import { CustomError } from './error';
import { handleError, ValidatorOptions } from './index';
import { CATEGORY } from '../constants/lunchRecommendation';
import {
  MAX_NAME_LENGTH,
  MetaCategory,
  MetaDistance,
  META_DISTANCE,
  MIN_NAME_LENGTH,
  MIN_REQUIRED_LENGTH,
} from '../constants/restaurants';

const Restaurant = {
  info(info: RestaurantInfo, options?: ValidatorOptions) {
    try {
      const isValid = this.checkInfo(info);

      return { isValid };
    } catch (error) {
      handleError(error, { onError: options?.onError });

      return { isValid: false };
    }
  },

  checkInfo({ name, distance, category }: RestaurantInfo) {
    this.checkName(name);
    this.checkCategory(category);
    this.checkDistance(distance);

    return true;
  },

  checkDistance(distance: unknown) {
    if (typeof distance !== 'string' && typeof distance !== 'number')
      throw new CustomError(ERROR_CODE.INVALID_CATEGORY, distance);
    if (!Object.keys(META_DISTANCE).includes(String(distance)))
      throw new CustomError(ERROR_CODE.INVALID_CATEGORY, distance);

    return true;
  },

  checkCategory(category: unknown) {
    if (typeof category !== 'string') throw new CustomError(ERROR_CODE.NOT_STRING, category);
    if (category.length < MIN_REQUIRED_LENGTH)
      throw new CustomError(ERROR_CODE.EMPTY_VALUE, category);
    if (!Object.values(CATEGORY).includes(category as MetaCategory))
      throw new CustomError(ERROR_CODE.INVALID_CATEGORY, category);

    return true;
  },

  checkName(name: unknown) {
    if (typeof name !== 'string') throw new CustomError(ERROR_CODE.NOT_STRING, name);
    if (name.length < MIN_NAME_LENGTH) throw new CustomError(ERROR_CODE.EMPTY_VALUE, name);
    if (name.length > MAX_NAME_LENGTH)
      throw new CustomError(ERROR_CODE.EXCEED_MAXIMUM_NAME_LENGTH, name);

    return true;
  },
};

export default Restaurant;
