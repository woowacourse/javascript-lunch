import { Irestaurant } from "../types/restaurant";

const restaurantListService = {
  getListIndexById(id: number, restaurantList: Irestaurant[]) {
    return restaurantList.findIndex((item) => item.id === id);
  },

  getListItemById(id: number, restaurantList: Irestaurant[]) {
    return restaurantList.find((item) => item.id === id);
  },
};
export default restaurantListService;
