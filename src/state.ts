import { Restaurant } from "../types/global";

interface State {
  currentRestaurantListId: string;
  setCurrentRestaurantListId(restaurantListId: string): void;
  currentRestaurantList: Restaurant[];
  setCurrentRestaurantList(restaurantList: Restaurant[]): void;
}

const state: State = {
  currentRestaurantListId: "allRestaurant",
  setCurrentRestaurantListId(restaurantListId) {
    this.currentRestaurantListId = restaurantListId;
  },
  currentRestaurantList: [],
  setCurrentRestaurantList(restaurantList) {
    this.currentRestaurantList = restaurantList;
  },
};

export default state;
