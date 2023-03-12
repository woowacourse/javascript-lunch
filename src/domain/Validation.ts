const Validation = {
  validateRestaurantNameLength(restaurantName: string) {
    if (restaurantName.length < 1 || restaurantName.length > 20)
      throw new Error('음식점 이름은 1 ~ 20자 사이어야 합니다.');
  },
};

export default Validation;