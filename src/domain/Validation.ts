import { RESTAURANT_NAME_LENGTH } from '../utils/constants';

const Validation = {
  validateRestaurantNameLength(restaurantName: string) {
    if (
      restaurantName.length < RESTAURANT_NAME_LENGTH.min ||
      restaurantName.length > RESTAURANT_NAME_LENGTH.max
    )
      throw new Error('음식점 이름은 1 ~ 20자 사이어야 합니다.');
  },
};

export default Validation;
