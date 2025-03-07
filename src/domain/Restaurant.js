class Restaurant {
  #information = {};

  constructor({ category, name, distance, description = "", link = "" }) {
    this.#information.category = category;
    this.#information.name = name;
    this.#information.distance = distance;
    this.#information.description = description;
    this.#information.link = link;
  }

  get information() {
    return { ...this.#information };
  }
}
export default Restaurant;
