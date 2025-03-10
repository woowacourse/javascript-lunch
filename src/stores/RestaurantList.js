class RestaurantList {
  #list;

  constructor(data) {
    this.#list = data;
  }

  get list() {
    return this.#list;
  }

  updateList(restaurant) {
    this.#list.push(restaurant);
  }
}

export default RestaurantList;
