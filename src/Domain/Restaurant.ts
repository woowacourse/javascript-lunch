class Restaurant {
  #name: string;
  #distance: string;
  #category: string;
  #description: string;
  #link: string;

  constructor(name: string, distance: string, category: string, description: string = '', link: string = '') {
    this.#name = name;
    this.#distance = distance;
    this.#category = category;
    this.#description = description;
    this.#link = link;
  }

  getName(): string {
    return String(this.#name);
  }

  getDistance(): string {
    return String(this.#distance);
  }

  getCategory(): string {
    return String(this.#category);
  }

  getDescription(): string {
    return String(this.#description);
  }

  getLink(): string {
    return String(this.#link);
  }
}

export default Restaurant;
