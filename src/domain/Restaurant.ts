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
    this.#validateRestaurantType(obj);
    this.#restaurantInfo = obj;
  }

  #validateRestaurantType(obj: IRestaurantInfo) {
    if (!RESTAURANT_CATEGORY.includes(obj.category)) {
      throw new Error('❌ 1');
    }

    if (typeof obj.name !== 'string') {
      throw new Error('❌ 2');
    }

    if (!DISTANCE_FROM_CAMPUS.includes(obj.distanceFromCampus)) {
      throw new Error('❌ 3');
    }
  }

  getInfo() {
    return { ...this.#restaurantInfo };
  }
}

export default Restaurant;
