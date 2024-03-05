interface IRestaurantInfo {
  category: '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
  name: string;
  distanceFromCampus: 5 | 10 | 15 | 20 | 30;
  description?: string[];
  link?: string;
}

class Restaurant {
  #restaurantInfo: IRestaurantInfo;

  constructor(obj: IRestaurantInfo) {
    this.#restaurantInfo = obj;
  }
}

export default Restaurant;
