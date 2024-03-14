import restaurantListService from "../services/restaurantListService";
import restaurantListStateStore from "../store/RestaurantListStateStore";
import { Irestaurant } from "../types/restaurant";

const RestaurantCRUD = {
  addNewRestaurant(restaurant: Irestaurant) {
    const prevData = restaurantListStateStore.getListData();
    const newData = [...prevData, restaurant];

    restaurantListStateStore.setNewData(newData);
  },

  updateRestaurant(id: number) {
    const restaurantList = restaurantListStateStore.getListData();
    const index = restaurantListService.getListIndexById(id, restaurantList);

    restaurantList[index].isLike = !restaurantList[index].isLike;

    restaurantListStateStore.setNewData(restaurantList);
  },

  deleteRestaurant(restaurant: Irestaurant) {
    const restaurantList = restaurantListStateStore.getListData();
    const index = restaurantListService.getListIndexById(
      restaurant.id,
      restaurantList,
    );
    restaurantList.splice(index, 1);

    restaurantListStateStore.setNewData(restaurantList);
  },
};
export default RestaurantCRUD;
