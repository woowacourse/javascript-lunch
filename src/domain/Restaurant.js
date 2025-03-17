class Restaurant {
  #information = {};

  constructor({ id, category, name, distance, description = "", link = "", favorites = false }) {
    this.#information.category = category;
    this.#information.id = id;
    this.#information.name = name;
    this.#information.distance = distance;
    this.#information.description = description;
    this.#information.link = link;
    this.#information.favorites = favorites;
  }

  get information() {
    return { ...this.#information };
  }

  updateInformation() {
    this.#information.favorites = !this.#information.favorites;
  }
}
export default Restaurant;
