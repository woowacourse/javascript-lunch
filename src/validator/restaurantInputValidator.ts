import { errorMessage } from '../constants/messages';
import IRestaurantInput from '../interfaces/IRestaurantInput';
import { validatorUtils } from './validatorUtils';

export const restaurantInputValidator = {
  validateRestaurant(restaurantInput: IRestaurantInput) {
    this.validateNameInput(restaurantInput.name);
    if (restaurantInput.description) {
      this.validateDescriptionInput(restaurantInput.description);
    }
  },

  validateNameInput(input: string): void {
    if (validatorUtils.isNameLengthValidRange(input)) {
      throw new Error(errorMessage.nameInputLength);
    }
  },

  validateDescriptionInput(input: string): void {
    if (validatorUtils.isDescriptionLengthValidRange(input)) {
      throw new Error(errorMessage.descriptionInputLength);
    }
  },
};
