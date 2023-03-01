type Restaurant = {
  category: string;
  name: string;
  distance: string;
  description: string;
  link: string;
};

class Restaurants {
  #restaurants: Restaurant[] = [];

  addRestaurant(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
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
    return [...this.#restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default Restaurants;
