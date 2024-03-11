import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';

export type ICategory = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type IDistanceFromCampus = 5 | 10 | 15 | 20 | 30;

export const DISTANCE_FROM_CAMPUS: readonly IDistanceFromCampus[] = Object.freeze([5, 10, 15, 20, 30]);

export const RESTAURANT_CATEGORY: readonly ICategory[] = Object.freeze([
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
}

class Restaurant {
  #restaurantInfo: IRestaurantInfo;

  constructor(obj: IRestaurantInfo) {
    this.#validateRestaurantCategory(obj.category);
    this.#validateDistanceFromCampus(obj.distanceFromCampus);
    this.#validateRestaurantName(obj.name);
    this.#restaurantInfo = obj;
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

  getRestaurantInfoObject() {
    return { ...this.#restaurantInfo };
  }
}

export default Restaurant;
