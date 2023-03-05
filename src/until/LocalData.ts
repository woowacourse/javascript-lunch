import { RestaurantType } from "../Template";

export const LocalData = {
  dataName: "restaurantList",

  setDate(data: RestaurantType[]) {
    localStorage.setItem(this.dataName, JSON.stringify(data));
  },

  getData() {
    const localList = localStorage.getItem(this.dataName);
    return localList && JSON.parse(localList);
  },
};
