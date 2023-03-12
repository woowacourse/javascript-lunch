import Restaurant from './Restaurant';

const Validation = {
  validateRestaurantNameLength(restaurantName: string) {
    if (
      restaurantName.length < Restaurant.MIN_LENGTH ||
      Restaurant.MAX_LENGTH < restaurantName.length
    )
      throw new Error(
        `음식점 이름은 ${Restaurant.MIN_LENGTH} ~ ${Restaurant.MAX_LENGTH}자 사이어야 합니다.`,
      );
  },
};

export default Validation;
