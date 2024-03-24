import { VALIDATOR_CONSTANTS } from '../constants';

type TRestaurantInfoValidator = {
  checkRestaurantName: (name: string) => boolean;
  checkRestaurantDescription: (description: string) => boolean;
};

const { NAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = VALIDATOR_CONSTANTS;

const restaurantInfoValidator: TRestaurantInfoValidator = {
  checkRestaurantName: (name: string) => {
    if (name.length > NAME_MAX_LENGTH) return false;
    return true;
  },

  checkRestaurantDescription: (description: string) => {
    if (description.length > DESCRIPTION_MAX_LENGTH) return false;
    return true;
  }
};

export default restaurantInfoValidator;
