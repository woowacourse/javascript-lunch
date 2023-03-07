import Restaurant from './Restaurant';

import { IRestaurant, RestaurantCategory, RestaurantSortType } from '../../types';

type FilterCategory = RestaurantCategory | '전체';

const RestaurantList = {
  render(targetElement: Element, template: string) {
    targetElement.innerHTML = template;
  },

  getTemplate(restaurants: IRestaurant[]) {
    return `
      <ul class="restaurant-list">
        ${restaurants.reduce((html, restaurant) => html + Restaurant.getTemplate(restaurant), '')}
      </ul>`;
  },

  getFilteredRestaurantsByCategory(restaurants: IRestaurant[], category: FilterCategory) {
    if (category === '전체') {
      return restaurants;
    }

    return restaurants.filter((restaurant) => {
      return restaurant.category === category;
    });
  },

  getSortedRestaurants(filterdRestaurants: IRestaurant[], sortOption: RestaurantSortType) {
    if (sortOption === 'name') {
      return this.getSortedRestaurantsByName(filterdRestaurants);
    }

    return this.getSortedRestaurantsByDistance(filterdRestaurants);
  },

  getSortedRestaurantsByName(restaurants: IRestaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return restaurant1.name.localeCompare(restaurant2.name);
    });

    return sortedRestaurants;
  },

  getSortedRestaurantsByDistance(restaurants: IRestaurant[]) {
    const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
      return Number(restaurant1.distance) - Number(restaurant2.distance);
    });

    return sortedRestaurants;
  },
};

export default RestaurantList;
