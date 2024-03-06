import Restaurant, { IRestaurantInfo, ICategory } from './Restaurant';

export const SORT_CONDITION: readonly ('이름순' | '거리순')[] = Object.freeze(['이름순', '거리순']);

class RestaurantCatalog {
  #restaurants: Restaurant[] = [];

  pushNewRestaurant(restaurantInfo: IRestaurantInfo) {
    this.#restaurants.forEach((restaurant: Restaurant) => {
      if (restaurant.getInfo().name === restaurantInfo.name) {
        throw new Error('❌');
      }
    });

    const newRestaurant = new Restaurant(restaurantInfo);
    this.#restaurants.push(newRestaurant);
  }

  filterByCategory(category: ICategory) {
    return this.#restaurants.filter((restaurant) => restaurant.getInfo().category === category);
  }

  sortByName() {
    return this.#restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.getInfo().name < restaurantCurrent.getInfo().name) return -1;
      return 1;
    });
  }

  sortByDistance() {
    return this.#restaurants.sort((restaurantPrev, restaurantCurrent) => {
      if (restaurantPrev.getInfo().distanceFromCampus !== restaurantCurrent.getInfo().distanceFromCampus) {
        return restaurantPrev.getInfo().distanceFromCampus - restaurantCurrent.getInfo().distanceFromCampus;
      }
      return restaurantPrev.getInfo().name.localeCompare(restaurantCurrent.getInfo().name);
    });
  }

  getRestaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantCatalog;
