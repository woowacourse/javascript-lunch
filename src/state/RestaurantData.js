import categoryImage from "../constants/categoryImage";

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
    id,
    name,
    distance,
    description = "",
    link = "",
    category = "",
  }) {
    this.#id = id && crypto.randomUUID();
    this.#src = categoryImage[category];
    this.#alt = category;
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
