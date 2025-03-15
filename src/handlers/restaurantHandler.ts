import Restaurant from "../components/Restaurant.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import type RestaurantList from "../stores/RestaurantList.js";
import { modalHandler } from "./modalHandler.js";
import { RestaurantItem } from "../types/restaurantItem.js";
import restaurantStorage from "../stores/restaurantStorage.js";

export const restaurantHandler = {
  addRestaurantItem: (restaurantProps: RestaurantItem) => {
    const listItem = document.createElement("li");
    listItem.classList.add("restaurant");
    const restaurant = Restaurant(restaurantProps);
    listItem.innerHTML = restaurant;
    listItem.addEventListener("click", () =>
      modalHandler.addRestaurantDetail(restaurantProps)
    );
    querySelector(".restaurant-list").appendChild(listItem);
  },

  uploadRestaurant: (restaurantList: RestaurantList, e: Event) => {
    const newRestaurant = restaurantHandler.createRestaurantData(e);

    try {
      e.preventDefault();

      validate.emptySelector(newRestaurant.category);
      validate.nameLength(newRestaurant.name);
      validate.emptySelector(newRestaurant.dist);
      validate.descLength(newRestaurant.description);
      validate.linkForm(newRestaurant.link);

      restaurantList.addRestaurant(newRestaurant);
      restaurantHandler.addRestaurantItem(newRestaurant);

      restaurantStorage.setRestaurantList(restaurantList.list);
      modalHandler.closeModal();
    } catch (error) {
      restaurantHandler.checkRequired(
        "category",
        newRestaurant.category,
        error as Error
      );
      restaurantHandler.checkRequired(
        "name",
        newRestaurant.name,
        error as Error
      );
      restaurantHandler.checkRequired(
        "distance",
        newRestaurant.dist,
        error as Error
      );
    }
  },

  checkRequired: (input: string, value: string | number, error: Error) => {
    if (value === "") {
      const requiredInput = querySelector(`#${input}`);
      modalHandler.addErrorText(requiredInput, error);
    }
  },

  createRestaurantData: (e: Event): RestaurantItem => {
    const formData = new FormData(e.target as HTMLFormElement);

    return {
      category: formData.get("category") as RestaurantItem["category"],
      name: formData.get("name") as RestaurantItem["name"],
      dist: formData.get("distance") as RestaurantItem["dist"],
      description: formData.get("description") as RestaurantItem["description"],
      link: formData.get("link") as RestaurantItem["link"],
    };
  },
};
