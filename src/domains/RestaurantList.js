import { CATEGORY_KEY } from '../../public/restaurantData.js';
import RestaurantItem from './RestaurantItem.js';

class RestaurantList {
  #restaurants = [];

  constructor(initialDatas = []) {
    initialDatas.forEach((data) => this.#restaurants.push(new RestaurantItem(data)));
  }

  getOrderedRestaurantList(order) {
    if (order === '이름순') {
      return [...this.#restaurants].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    } else if (order === '거리순') {
      return [...this.#restaurants].sort((a, b) => a.distance - b.distance);
    }
  }

  filterFavorite() {
    return [...this.#restaurants].filter((data) => data.isFavorite);
  }

  toggleFavorite({ id, tab, category, order }) {
    this.#restaurants = [...this.#restaurants].map((data) => {
      if (data.id === id) {
        return new RestaurantItem({
          ...data.getInfo(),
          isFavorite: !data.isFavorite,
        });
      }

      return data;
    });

    return this.sortByOptions({ tab, order, category });
  }

  deleteRestaurant({ id, tab, order, category }) {
    this.#restaurants = this.#restaurants.filter((data) => data.id !== id);
    return this.sortByOptions({ tab, order, category });
  }

  addRestaurant({ data, tab, order, category }) {
    this.#restaurants.push(new RestaurantItem({ ...data }));
    return this.sortByOptions({ tab, order, category });
  }

  sortByOptions({ tab, order, category }) {
    if (tab === 'all') {
      return {
        originalList: this.#restaurants,
        filteredList: this.filterRestaurant(category, order),
      };
    } else if (tab === 'favorite') {
      return {
        originalList: this.#restaurants,
        filteredList: this.filterFavorite(),
      };
    }
  }

  filterRestaurant(category, order) {
    let filteredRestaurants;

    if (category === '전체') {
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
