import Restaurant, { RestaurantInfo } from "./Restaurant";

class Restaurants {
  #restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.#validateUniqueName(restaurants);
    this.#restaurants = restaurants;
  }

  add(restaurant: Restaurant): void {
    this.#validateUniqueName([...this.#restaurants, restaurant]);

    this.#restaurants = [...this.#restaurants, restaurant];
  }

  getDetails(): RestaurantInfo[] {
    return this.#restaurants.map((restaurant) => restaurant.getInfo());
  }

  #validateUniqueName(restaurants: Restaurant[]) {
    const names = restaurants.map((restaurant) => restaurant.getName());

    if (new Set(names).size !== names.length) {
      throw new Error("중복된 식당 이름이 있습니다.");
    }
  }
}

export default Restaurants;
