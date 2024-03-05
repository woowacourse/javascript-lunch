import Restaurant from './Restaurant';

class Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  getFilteredByCategory(category: string) {
    return [...this.#restaurants.filter((restaurant) => restaurant.getCategory() === category)];
  }

  getSortedByName() {
    return [...this.#restaurants.sort((a, b) => a.getName() - b.getName())];
  }

  getSortedByDistance() {
    return [...this.#restaurants.sort((a, b) => a.getDistance() - b.getDistance())];
  }
}

export default Restaurants;
