import RestaurantList from "../components/RestaurantList";
import Validator from "../tools/Validator";
import IRestaurant from "../type/IRestaurant";
import { closeBottomSheet } from "./bottomSheet";

export const createNewRestaurant = (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const newRestaurant: IRestaurant = {
    category: formData.get("category") as string,
    name: formData.get("name") as string,
    distance: Number(formData.get("distance")),
    description: formData.get("description") as string,
    link: formData.get("link") as string,
  };
  return newRestaurant;
};

export const addNewRestaurant = (newRestaurant: IRestaurant) => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.addRestaurant(newRestaurant);
  }
};

export const tryAddNewRestaurant = (newRestaurant: IRestaurant) => {
  try {
    Validator.checkRestaurant(newRestaurant);
    addNewRestaurant(newRestaurant);
    closeBottomSheet();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
