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

  filterFavorite() {
    return [...this.#restaurants].filter((data) => data.isFavorite);
  }

  toggleFavorite(id) {
    this.#restaurants = [...this.#restaurants].map((data) => {
      if (data.id === id) {
        return new RestaurantItem({
          ...data.getInfo(),
          isFavorite: !data.isFavorite,
        });
      }

      return data;
    });

    return [...this.#restaurants];
  }

  deleteRestaurant({ id, tab, order, category }) {
    this.#restaurants = this.#restaurants.filter((data) => data.id !== id);

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

  addRestaurant({ data, tab, order, category }) {
    this.#restaurants.push(new RestaurantItem({ ...data }));

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
}

export default RestaurantList;
