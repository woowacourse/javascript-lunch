import { CATEGORY_KEY } from '../../public/restaurantData.js';
import RestaurantItem from './RestaurantItem.js';

class RestaurantList {
  #restaurants = [];

  constructor(initialDatas = []) {
    initialDatas.forEach((data) => this.addRestaurant(data));
  }

  addRestaurant(restaurantData) {
    this.#restaurants.push(new RestaurantItem(restaurantData));
  }

  getOrderedRestaurantList(order) {
    if (order === '이름순') {
      return [...this.#restaurants].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === '거리순') {
      return [...this.#restaurants].sort((a, b) => a.distance - b.distance);
    }
  }

  filterRestaurant(category, order) {
    let filteredRestaurants;

    if (!category || category === '전체') {
      filteredRestaurants = [...this.#restaurants];
    } else {
      filteredRestaurants = this.#restaurants.filter(
        (data) => data.category === CATEGORY_KEY[category]
      );
    }

    if (order === '이름순') {
      filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === '거리순') {
      filteredRestaurants.sort((a, b) => a.distance - b.distance);
    }

    return filteredRestaurants;
  }
}

export default RestaurantList;
