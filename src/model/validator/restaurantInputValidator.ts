import { errorMessage } from '@res/constants/messages';
import { validatorUtils } from './validatorUtils';

export const restaurantInputValidator = {
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
