import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantServiceType {
  list: RestaurantType[];
  settingList: () => void;
  addRestaurant: (restaurant: RestaurantType) => void;
}

export const RestaurantService: RestaurantServiceType = {
  list: [],

  settingList() {
    const isLocalData = LocalData.getData();
    if (isLocalData) {
      this.list = isLocalData;
      return;
    }
    LocalData.setDate(this.list);
    return;
  },

  addRestaurant(restaurant) {
    this.list = [restaurant, ...this.list];
    LocalData.setDate(this.list);
  },
};
