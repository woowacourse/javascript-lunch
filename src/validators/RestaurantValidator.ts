import { RestaurantInfo } from '../../types/restaurants';

const RestaurantValidator = {
  validate(restaurantInput: RestaurantInfo): boolean {
    if (!restaurantInput.category || !restaurantInput.name || !restaurantInput.distance) {
      alert('카테고리, 이름, 거리 항목은 필수 입력입니다.');
      return false;
    }

    if (restaurantInput.name) {
      if (restaurantInput.name.length > 100) {
        alert('이름은 100자 이내로 작성해야 합니다.');
        return false;
      }
    }

    if (restaurantInput.link) {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

      if (!urlRegex.test(restaurantInput.link)) {
        alert('올바른 url 형식을 입력해주세요.');
        return false;
      }
    }

    if (restaurantInput.description) {
      if (restaurantInput.description && restaurantInput.description.length > 300) {
        alert('설명은 300자 이내로 작성해야 합니다.');
        return false;
      }
    }

    return true;
  },
};

export default RestaurantValidator;
