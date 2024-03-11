import { ERROR_PREFIX, RESTAURANT_ERROR_MESSAGES } from '../constants/errorMessage';

export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type DistanceFromCampus = 5 | 10 | 15 | 20 | 30;

export const DISTANCE_FROM_CAMPUS: readonly DistanceFromCampus[] = Object.freeze([5, 10, 15, 20, 30]);

export const RESTAURANT_CATEGORY: readonly Category[] = Object.freeze([
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
]);

export interface IRestaurantInfo {
  id?: number;
  category: Category;
  name: string;
  distanceFromCampus: DistanceFromCampus;
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

  #validateRestaurantCategory(category: Category) {
    if (!RESTAURANT_CATEGORY.includes(category)) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_CATEGORY}`);
    }
  }

  #validateRestaurantName(name: string) {
    if (typeof name !== 'string' || !name) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_NAME}`);
    }
  }

  #validateDistanceFromCampus(distanceFromCampus: DistanceFromCampus) {
    if (!DISTANCE_FROM_CAMPUS.includes(distanceFromCampus)) {
      throw new Error(`${ERROR_PREFIX}${RESTAURANT_ERROR_MESSAGES.WRONG_DISTANCE}`);
    }
  }

  getRestaurantInfoObject() {
    return { ...this.#restaurantInfo };
  }
}

export default Restaurant;
