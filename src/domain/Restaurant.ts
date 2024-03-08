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
      throw new Error('❌ 잘못된 카테고리를 입력하였습니다.');
    }
  }

  #validateRestaurantName(name: string) {
    if (typeof name !== 'string' || !name) {
      throw new Error('❌ 잘못된 이름을 입력하였습니다.');
    }
  }

  #validateDistanceFromCampus(distanceFromCampus: IDistanceFromCampus) {
    if (!DISTANCE_FROM_CAMPUS.includes(distanceFromCampus)) {
      throw new Error('❌ 잘못된 거리(도보 이동 시간)을 입력하였습니다.');
    }
  }

  getInfo() {
    return { ...this.#restaurantInfo };
  }
}

export default Restaurant;
