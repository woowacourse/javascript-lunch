import { errorMessage } from '@res/constants/messages';
import { validatorUtils } from './validatorUtils';

export const restaurantInputValidator = {
  validateNameInput(nameInput: string): void {
    if (validatorUtils.isNameLengthValidRange(nameInput)) {
      throw new Error(errorMessage.nameInputLength);
    }
  },
};
