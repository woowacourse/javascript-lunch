import {
  createNewRestaurant,
  tryAddNewRestaurant,
} from "../../domain/restaurant";
import { closeBottomSheet } from "../BottomSheet/handleBottomSheet";

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
