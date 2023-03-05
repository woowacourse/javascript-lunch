import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantListType {
  list: RestaurantType[];
  settingList: () => void;
}

export const RestaurantList: RestaurantListType = {
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
};
