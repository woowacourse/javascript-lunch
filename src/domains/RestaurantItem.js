class RestaurantItem {
  #restaurantInfo = {};

  constructor({ category, name, distance, description, link }) {
    this.#restaurantInfo = {
      id: this.#generateId(),
      category,
      name,
      distance,
      description,
      link,
    };
  }

  getInfo() {
    return { ...this.#restaurantInfo };
  }

  getId() {
    return this.#restaurantInfo.id;
  }

  #generateId() {
    return Date.now();
  }
}

export default RestaurantItem;
