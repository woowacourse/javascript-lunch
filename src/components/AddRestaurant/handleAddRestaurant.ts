import {
  createNewRestaurant,
  tryAddNewRestaurant,
} from "../../domain/restaurant";
import IRestaurant from "../../type/IRestaurant";
import { closeBottomSheet } from "../BottomSheet/handleBottomSheet";
import RestaurantList from "../RestaurantList";

export const addNewRestaurant = (newRestaurant: IRestaurant) => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.addRestaurant(newRestaurant);
  }
};

export const onClickCancelButton = () => {
  const cancelButton = document.getElementById("cancelButton");
  cancelButton?.addEventListener("click", () => {
    closeBottomSheet();
  });
};

export const onSubmitRestaurantForm = () => {
  const restaurantForm = document.getElementById("restaurantForm");
  restaurantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    tryAddNewRestaurant(createNewRestaurant(event));
  });
};
