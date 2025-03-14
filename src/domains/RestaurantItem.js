class RestaurantItem {
  #restaurantInfo = {};

  constructor({ id, category, name, distance, description = '', isFavorite = false, link = '' }) {
    this.#restaurantInfo = {
      id: id || this.#generateId(),
      category,
      name,
      distance,
      description,
      isFavorite,
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

  get isFavorite() {
    return this.#restaurantInfo.isFavorite;
  }

  set isFavorite(flag) {
    this.#restaurantInfo.isFavorite = flag;
  }

  get id() {
    return this.#restaurantInfo.id;
  }

  #generateId() {
    return Date.now();
  }
}

export default RestaurantItem;
