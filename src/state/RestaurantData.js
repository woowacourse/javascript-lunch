export default class RestaurantData {
  #id;
  #src;
  #alt;
  #name;
  #distance;
  #description;
  #link;
  #category;
  constructor({
    src,
    alt,
    name,
    distance,
    description = "",
    link = "",
    category = "",
  }) {
    this.#id = crypto.randomUUID();
    this.#src = src;
    this.#alt = alt;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#link = link;
    this.#category = category;
  }

  getData() {
    return {
      id: this.#id,
      alt: this.#alt,
      src: this.#src,
      name: this.#name,
      distance: this.#distance,
      description: this.#description,
      link: this.#link,
      category: this.#category,
    };
  }
}
