import { Restaurant } from "../../types/type.js";
import { StorageController } from "../../utils/storage.js";
import updateRestaurantList from "../../views/mainPage/components/display/restaurantList.js";
import { closeModal } from "../modal/modalController.js";

const restaurantStorage = new StorageController<Restaurant[]>("restaurants");

const handleDeleteRestaurant = (target: HTMLElement) => {
  const deleteButton = target.closest(".button--delete") as HTMLElement;
  if (!deleteButton) return;

  const currentRestaurantId = deleteButton.dataset.deleteTarget;
  if (!currentRestaurantId) return;

  const restaurants = restaurantStorage.getStorage() ?? [];
  const updatedRestaurants = restaurants.filter(
    (restaurant) => restaurant.id !== currentRestaurantId
  );

  restaurantStorage.setStorage(updatedRestaurants);
  updateRestaurantList();
  closeModal();
};

export default handleDeleteRestaurant;
