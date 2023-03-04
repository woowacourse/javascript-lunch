import { IValidator } from '../../validation/validator';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';

export const errorHandler = (validator: IValidator, input: Omit<RestaurantInfo, 'id'>) => {
  try {
    validator.checkName(input.name);
    if (input.description) validator.checkDescription(input.description);
  } catch (err) {
    alert(err);
  }
};
