import restaurantListService from "../services/restaurantListService";
import restaurantListStateStore from "../store/RestaurantListStateStore";
import { Irestaurant } from "../types/restaurant";
import replaceLikeImg from "../utils/replaceLikeImg";

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

  updateLikeState(restaurantElement: Element, imgElement: string) {
    const likeButtonImage = restaurantElement.querySelector(imgElement);
    if (likeButtonImage) replaceLikeImg(restaurantElement, likeButtonImage);
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
