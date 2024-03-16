import Restaurant, { RestaurantInfo } from "../domain/Restaurant";
import Restaurants from "../domain/Restaurants";
import localStore from "./localStorageStore";

const parseRestaurants = (restaurants: RestaurantInfo[]): Restaurants => {
  const restaurantsArray = restaurants.map(
    (restaurant) => new Restaurant(restaurant)
  );
  return new Restaurants(restaurantsArray);
};

const restaurantStore = {
  get(): Restaurants {
    const restaurantInfos = localStore.getParsedItem("restaurants");

    if (!restaurantInfos) {
      return new Restaurants([]);
    }

    try {
      return parseRestaurants(restaurantInfos);
    } catch {
      localStore.reset();
      alert("데이터가 훼손되어 식당 목록이 초기화되었습니다.");
      return this.get();
    }
  },

  add(restaurant: Restaurant): void {
    const restaurants = this.get();
    restaurants.add(restaurant);

    this.set(restaurants);
  },

  set(restaurants: Restaurants): void {
    localStore.setItem("restaurants", restaurants.getDetails());
  },

  removeByName(restaurantName: string): void {
    const restaurants = this.get();

    const updatedRestaurantInfos = restaurants
      .getDetails()
      .filter(
        (restaurant: RestaurantInfo) => restaurant.name !== restaurantName
      );

    const updatedRestaurants = parseRestaurants(updatedRestaurantInfos);

    this.set(updatedRestaurants);
  },
};

export default restaurantStore;
