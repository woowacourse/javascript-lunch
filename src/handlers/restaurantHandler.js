import Restaurant from "../components/Restaurant.js";

import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import { modalHandler } from "./modalHandler.js";

export const restaurantHandler = {
  addRestaurantItem: (restaurantProps) => {
    const list = document.createElement("li");
    list.classList.add("restaurant");
    const restaurant = Restaurant(restaurantProps);
    list.innerHTML = restaurant;
    querySelector(".restaurant-list").appendChild(list);
  },

  uploadRestaurant: (restaurantList, e) => {
    const newRestaurant = restaurantHandler.createRestaurantData(e);

    try {
      e.preventDefault();

      validate.emptySelector(newRestaurant.category);
      validate.nameLength(newRestaurant.name);
      validate.emptySelector(newRestaurant.dist);
      validate.descLength(newRestaurant.description);
      validate.linkForm(newRestaurant.link);

      restaurantList.updateList(newRestaurant);
      restaurantHandler.addRestaurantItem(newRestaurant);

      modalHandler.closeModal();
    } catch (error) {
      restaurantHandler.checkRequired(
        "category",
        newRestaurant.category,
        error
      );
      restaurantHandler.checkRequired("name", newRestaurant.name, error);
      restaurantHandler.checkRequired("distance", newRestaurant.dist, error);
    }
  },

  checkRequired: (input, value, error) => {
    if (value === "") {
      const input = querySelector(`#${input}`);
      modalHandler.addErrorText(input, error);
    }
  },

  createRestaurantData: (e) => {
    return {
      category: e.target[0].value,
      name: e.target[1].value,
      dist: e.target[2].value,
      description: e.target[3].value,
      link: e.target[4].value,
    };
  },
};
