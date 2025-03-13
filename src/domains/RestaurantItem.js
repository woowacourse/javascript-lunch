class RestaurantItem {
  #restaurantInfo = {};

  constructor({ id, category, name, distance, description, link }) {
    this.#restaurantInfo = {
      id: id || this.#generateId(),
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

  get name() {
    return this.#restaurantInfo.name;
  }

  get category() {
    return this.#restaurantInfo.category;
  }

  get distance() {
    return this.#restaurantInfo.distance;
  }

  getId() {
    return this.#restaurantInfo.id;
  }

  #generateId() {
    return Date.now();
  }
}

export default RestaurantItem;
