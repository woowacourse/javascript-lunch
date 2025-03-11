class Restaurant {
  #name;
  #distance;
  #description;
  #category;

  constructor(name, distance, description, category) {
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
  }

  getName() {
    return String(this.#name);
  }

  getDistance() {
    return String(this.#distance);
  }

  getDescription() {
    return String(this.#description);
  }

  getCategory() {
    return String(this.#category);
  }
}

export default Restaurant;
