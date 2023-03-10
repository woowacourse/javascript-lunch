class Restaurants {
  #restaurants;

  constructor(restaurants = []) {
    this.#restaurants = restaurants;
  }

  getFiltered(category, sorting) {
    this.sort(sorting);
    return category === '전체'
      ? this.#restaurants
      : this.#restaurants.filter((restaurant) => restaurant.category === category);
  }

  sort(sorting) {
    const getPivot = (restaurant) => {
      if (sorting === 'name') return restaurant.name;
      if (sorting === 'distance') return Number(restaurant.takeMinute);
    };

    this.#restaurants.sort((a, b) => {
      if (getPivot(a) > getPivot(b)) return 1;
      if (getPivot(a) < getPivot(b)) return -1;
      return 0;
    });
  }
}

export default Restaurants;
