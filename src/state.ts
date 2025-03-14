import { Restaurant } from "../types/global";

interface State {
  currentRestaurantList: Restaurant[];
  setCurrentRestaurantList(restaurantList: Restaurant[]): void;
}

const state: State = {
  currentRestaurantList: [],
  setCurrentRestaurantList(restaurantList) {
    this.currentRestaurantList = restaurantList;
  },
};

export default state;
