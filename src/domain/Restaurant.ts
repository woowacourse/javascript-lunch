import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';

export type ICategory = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type IDistanceFromCampus = 5 | 10 | 15 | 20 | 30;

export const DISTANCE_FROM_CAMPUS: readonly IDistanceFromCampus[] = Object.freeze([5, 10, 15, 20, 30]);

export const RESTAURANT_CATEGORY: readonly ICategory[] = Object.freeze([
  '전체',
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
]);

export interface IRestaurantInfo {
  category: ICategory;
  name: string;
  distanceFromCampus: IDistanceFromCampus;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

class Restaurant {
  #restaurantInfo: IRestaurantInfo;

  constructor(obj: IRestaurantInfo) {
    this.#validateRestaurantCategory(obj.category);
    this.#validateDistanceFromCampus(obj.distanceFromCampus);
    this.#validateRestaurantName(obj.name);
    this.#restaurantInfo = obj;
  }

  static generateImageSrc(category: ICategory) {
    switch (category) {
      case '한식':
        return 'korean';
      case '중식':
        return 'chinese';
      case '일식':
        return 'japanese';
      case '양식':
        return 'western';
      case '아시안':
        return 'asian';
      case '기타':
        return 'etc';
      default:
        return 'korean';
    }
  }

  #validateRestaurantCategory(category: ICategory) {
    if (!RESTAURANT_CATEGORY.includes(category)) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_CATEGORY}`);
    }
  }

  #validateRestaurantName(name: string) {
    if (typeof name !== 'string' || !name) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_NAME}`);
    }
  }

  #validateDistanceFromCampus(distanceFromCampus: IDistanceFromCampus) {
    if (!DISTANCE_FROM_CAMPUS.includes(distanceFromCampus)) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_DISTANCE}`);
    }
  }

  getInfo() {
    return { ...this.#restaurantInfo };
  }
}

export default Restaurant;
