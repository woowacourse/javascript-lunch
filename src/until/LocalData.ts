import { RestaurantType } from "../Template";

export const LocalData = {
  setDate(dataName: string, data: RestaurantType[]) {
    localStorage.setItem(dataName, JSON.stringify(data));
  },

  getData(dataName: string) {
    const localList = localStorage.getItem(dataName);
    return localList && JSON.parse(localList);
  },
};
