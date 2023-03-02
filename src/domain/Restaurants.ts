import Restaurant from './Restaurant';

class Restaurants {
  #restaurants: Restaurant[] = [];

  getRestaurants(category?: string) {
    if (!category) return this.#restaurants;

    return this.#restaurants.filter((restaurant) => restaurant.isMatchCategory(category));
  }
}

export default Restaurants;
