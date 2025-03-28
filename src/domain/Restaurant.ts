import { RestaurantInformation } from "./type";

class Restaurant {
  #information: RestaurantInformation;

  constructor({ id, category, name, distance, description = "", link = "", favorites = false }: RestaurantInformation) {
    this.#information = {
      id,
      category,
      name,
      distance,
      description,
      link,
      favorites,
    };
  }

  get information(): RestaurantInformation {
    return { ...this.#information };
  }

  updateFavorite(): void {
    this.#information.favorites = !this.#information.favorites;
  }
}

export default Restaurant;
