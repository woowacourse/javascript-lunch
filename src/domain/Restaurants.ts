import { Restaurant, Category, RestaurantSortType } from '../types';

const dummyRestaurant: Restaurant[] = [
  {
    category: '한식',
    name: '한식111',
    distance: '10',
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은',
    link: 'www.naver.com',
  },
  {
    category: '한식',
    name: '한식222',
    distance: '5',
    description: '맛있어 맛있어',
  },
  {
    category: '한식',
    name: '한식333',
    distance: '20',
    description: '꿀맛탱',
  },
  {
    category: '기타',
    name: '기타기타',
    distance: '20',
    description: '맛있어 맛있어',
  },
  {
    category: '중식',
    name: '철가방',
    distance: '15',
    description: '짱짱맛',
  },
];

export default class Restaurants {
  #restaurants: Restaurant[];

  constructor(data = dummyRestaurant) {
    this.#restaurants = data;
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredRestaurantsByCategory(category: Category) {
    if (category === '전체') {
      return this.#restaurants;
    }

    return this.#restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  }

  getSortedRestaurants(filterdRestaurants: Restaurant[], sortOption: RestaurantSortType) {
    if (sortOption === 'name') {
      return this.getSortedRestaurantsByName(filterdRestaurants);
    }

    return this.getSortedRestaurantsByDistance(filterdRestaurants);
  }

  getSortedRestaurantsByName(restaurants: Restaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return restaurant1.name.localeCompare(restaurant2.name);
    });

    return sortedRestaurants;
  }

  getSortedRestaurantsByDistance(restaurants: Restaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return Number(restaurant1.distance) - Number(restaurant2.distance);
    });

    return sortedRestaurants;
  }

  getRestaurants() {
    return this.#restaurants;
  }
}
