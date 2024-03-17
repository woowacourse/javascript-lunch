import Restaurant, { RestaurantInfo } from "./Restaurant";

class Restaurants {
  protected restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.validateUniqueName(restaurants);
    this.restaurants = restaurants;
  }

  add(restaurant: Restaurant): void {
    this.validateUniqueName([...this.restaurants, restaurant]);

    this.restaurants = [...this.restaurants, restaurant];
  }

  remove(restaurantName: string): Restaurant[] {
    this.restaurants = this.restaurants.filter(
      (item) => item.getName() !== restaurantName
    );

    return this.restaurants;
  }

  findRestaurantByName(restaurantName: string) {
    return this.restaurants.find(
      (restaurant) => restaurant.getName() === restaurantName
    );
  }

  getDetails(): RestaurantInfo[] {
    return this.restaurants.map((restaurant) => restaurant.getInfo());
  }

  private validateUniqueName(restaurants: Restaurant[]) {
    const names = restaurants.map((restaurant) => restaurant.getName());

    if (new Set(names).size !== names.length) {
      throw new Error("중복된 식당 이름이 있습니다.");
    }
  }
}

export default Restaurants;
