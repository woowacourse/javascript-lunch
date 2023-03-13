import { Restaurant } from '../type/common';

class Restaurants {
  #restaurants: Restaurant[] = [];

  #id = 0;

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push({ id: this.#id++, ...restaurant });
  }

  getRestaurants() {
    return this.#restaurants;
  }

  sortByName() {
    return [...this.#restaurants].sort((x, y) => x.name.localeCompare(y.name));
  }

  sortByDistance() {
    return [...this.#restaurants].sort(
      (x, y) => Number(x.distance) - Number(y.distance)
    );
  }

  filterByCategory(category: string) {
    if (category === '전체') {
      return this.#restaurants;
    }

    return this.#restaurants.filter(
      (restaurant) => restaurant.category === category
    );
  }

  filterByFavorite() {
    return this.#restaurants.filter((restaurant) => !!restaurant.favorite);
  }

  removeRestaurant(id: number) {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
  }

  checkFavorite(id: number) {
    this.#restaurants = this.#restaurants.map((restaurant) => {
      if (restaurant.id === id) restaurant.favorite = !restaurant.favorite;

      return restaurant;
    });
  }
}

export default Restaurants;
