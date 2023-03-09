import { RESTAURANT_NAME_LENGTH } from '../utils/constants';

const Validation = {
  validateRestaurantNameLength(restaurantName: string) {
    if (
      restaurantName.length < RESTAURANT_NAME_LENGTH.min ||
      restaurantName.length > RESTAURANT_NAME_LENGTH.max
    )
      throw new Error('음식점 이름은 1 ~ 20자 사이어야 합니다.');
  },

  validateRestaurantNameDuplication(restaurantName: string, existRestaurantsName?: string[]) {
    if (!existRestaurantsName) return;

    const isExist = existRestaurantsName.includes(restaurantName);

    if (isExist) throw new Error('음식점이 존재합니다. 체인점인 경우 지역까지 명시해주세요.');
  },
};

export default Validation;
