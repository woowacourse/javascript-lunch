interface RestaurantInfo {
  category: string;
  name: string;
  description: string;
  distance: number;
  link: string;
}

class Restaurant {
  #category: string;

  #name: string;

  #distance: number;

  #description: string;

  #link: string;

  constructor({ category, name, distance, description, link }: RestaurantInfo) {
    this.#category = category;
    this.#name = name;
    this.#description = description;
    this.#distance = distance;
    this.#link = link;
  }

  getInfo() {
    return {
      category: this.#category,
      name: this.#name,
      description: this.#description,
      distance: this.#distance,
      link: this.#link,
    };
  }
}

export default Restaurant;
