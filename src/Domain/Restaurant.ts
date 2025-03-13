class Restaurant {
  #name: string;
  #distance: string;
  #description: string;
  #category: string;

  constructor(name: string, distance: string, description: string, category: string) {
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
  }

  getName(): string {
    return String(this.#name);
  }

  getDistance(): string {
    return String(this.#distance);
  }

  getDescription(): string {
    return String(this.#description);
  }

  getCategory(): string {
    return String(this.#category);
  }
}

export default Restaurant;
