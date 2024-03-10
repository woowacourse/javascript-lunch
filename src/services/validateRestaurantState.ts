import { Category, RestaurantState } from '../types';

import RestaurantListStorageService from './restaurantListStorageService';

const valid = {
  success: true,
};

const validate = {
  validateCategory(category?: Category) {
    if (category === undefined || category.length <= 0) {
      return {
        targetClassName: 'invalid_category',
        success: false,
        errorMessage: '카테고리는 필수적으로 선택해주세요.',
      };
    }
    return valid;
  },

  validateNoName(name?: string) {
    if (name === undefined || name.length <= 0) {
      return {
        targetClassName: 'invalid_name',
        success: false,
        errorMessage: '레스토랑 이름은 필수적으로 작성해주세요',
      };
    }
    return valid;
  },

  validateDuplicateName(name?: string) {
    if (this.checkDuplicate(name)) {
      return {
        targetClassName: 'invalid_name',
        success: false,
        errorMessage: '이미 등록된 레스토랑입니다.',
      };
    }
    return valid;
  },

  validateName(name?: string) {
    if (!this.validateNoName(name).success) {
      return this.validateNoName(name);
    }
    if (!this.validateDuplicateName(name).success) {
      return this.validateDuplicateName(name);
    }
    return valid;
  },

  checkDuplicate(name?: string) {
    const restaurantList = RestaurantListStorageService.getData();
    return restaurantList.find((restaurant: RestaurantState) => restaurant.name === name);
  },

  validateDistance(distance?: number) {
    if (distance === undefined) {
      return {
        targetClassName: 'invalid_distance',
        success: false,
        errorMessage: '거리를 필수적으로 선택해주세요.',
      };
    }
    return valid;
  },

  validateDescription(description?: string) {
    if (description?.length && description.length > 200) {
      return {
        targetClassName: 'invalid_description',
        success: false,
        errorMessage: '설명의 최대 글자수는 200자입니다.',
      };
    }
    return valid;
  },

  validateLink(link?: string) {
    if (!link?.startsWith('http') && link !== undefined) {
      return {
        targetClassName: 'invalid_link',
        success: false,
        errorMessage: '유효한 주소값을 입력해주세요',
      };
    }
    return valid;
  },
};

function validateRestaurantState(restaurantInfo: Partial<RestaurantState>) {
  return [
    validate.validateCategory(restaurantInfo.category),
    validate.validateName(restaurantInfo.name),
    validate.validateDistance(restaurantInfo.distance),
    validate.validateDescription(restaurantInfo.description),
    validate.validateLink(restaurantInfo.link),
  ];
}
export default validateRestaurantState;
