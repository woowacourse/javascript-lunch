import Restaurant from "../domain/Restaurant";
import Restaurants from "../domain/Restaurants";
import localStore from "./localStorageStore";

const restaurantStore = {
  getRestaurants(): Restaurants {
    const restaurantInfos = localStore.getParsedItem("restaurants");

    if (!restaurantInfos) {
      return new Restaurants([]);
    }

    try {
      const restaurantsArray = (restaurantInfos as []).map(
        (restaurant) => new Restaurant(restaurant)
      );
      return new Restaurants(restaurantsArray);
    } catch {
      localStore.reset();
      alert("데이터 건들지 마세요!");
      return this.getRestaurants();
    }
  },

  setRestaurants(restaurants: Restaurants) {
    localStore.setItem("restaurants", restaurants.getDetails());
  },

  removeRestaurantByName(name: string) {
    const newRestaurants = this.getRestaurants().remove(name);
    this.setRestaurants(new Restaurants(newRestaurants));
  },

  findRestaurantInfo(restaurantName: string): Restaurant | undefined {
    return this.getRestaurants().findRestaurantByName(restaurantName);
  },

  getFavoriteRestaurantsName(): string[] {
    const favoriteRestaurantNames = localStore.getParsedItem(
      "favoriteRestaurantsNames"
    );

    return favoriteRestaurantNames ? favoriteRestaurantNames : [];
  },

  setNewFavoriteRestaurantName(name: string): void {
    const newFavoriteRestaurants = [...this.getFavoriteRestaurantsName(), name];
    localStore.setItem("favoriteRestaurantsNames", newFavoriteRestaurants);
  },

  removeFavoriteRestaurantName(name: string): void {
    const newFavoriteRestaurants = this.getFavoriteRestaurantsName().filter(
      (restaurantName) => restaurantName !== name
    );
    localStore.setItem("favoriteRestaurantsNames", newFavoriteRestaurants);
  },
};

export default restaurantStore;
