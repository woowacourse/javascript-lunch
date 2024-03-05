class Restaurants implements Restaurants {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
  }

  filterByCategory(category: Category) {
    return this.#restaurants.filter((restaurant) => restaurant.category === category);
  }

  addRestaurant(restaurant: Restaurant) {
    // TODO: 이 값이 있는지 없는지 -> set 고려

    this.#restaurants.push(restaurant);
  }
}

export default Restaurants;
