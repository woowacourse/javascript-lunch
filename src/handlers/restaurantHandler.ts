import Restaurant from "../components/Restaurant.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
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
    restaurantHandler.addFavoriteEvent(listItem, restaurantProps.name);

    querySelector(".restaurant-list").appendChild(listItem);
  },

  uploadRestaurant: (restaurantList: RestaurantItem[], e: Event) => {
    const newRestaurant = restaurantHandler.createRestaurantData(e);

    try {
      e.preventDefault();

      validate.emptySelector(newRestaurant.category);
      validate.nameLength(newRestaurant.name);
      validate.emptySelector(newRestaurant.dist);
      validate.descLength(newRestaurant.description);
      validate.linkForm(newRestaurant.link);

      restaurantList.push(newRestaurant);
      restaurantHandler.addRestaurantItem(newRestaurant);

      restaurantStorage.setRestaurantList(restaurantList);
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
      isFavorite: false,
    };
  },

  removeRestaurant: (name: string) => {
    const restaurantList = restaurantStorage.getRestaurantList();

    restaurantStorage.setRestaurantList(
      restaurantList.filter(
        (restaurant: RestaurantItem) => restaurant.name !== name
      )
    );

    window.location.reload();
  },

  findRestaurantByName: (name: string): RestaurantItem | undefined => {
    const restaurantList = restaurantStorage.getRestaurantList();
    return restaurantList.find(
      (restaurant: RestaurantItem) => restaurant.name === name
    );
  },

  updateFavoriteState: (name: string): boolean => {
    const restaurantList = restaurantStorage.getRestaurantList();
    const restaurant = restaurantList.find(
      (restaurant: RestaurantItem) => restaurant.name === name
    );

    if (!restaurant) return false;

    restaurant.isFavorite = !restaurant.isFavorite;
    restaurantStorage.setRestaurantList(restaurantList);

    return restaurant.isFavorite;
  },

  updateStarIconUI: (name: string, isFavorite: boolean): void => {
    document.querySelectorAll(".restaurant").forEach((restaurantItem) => {
      const restaurantNameElement =
        restaurantItem.querySelector(".restaurant__name");
      if (restaurantNameElement?.textContent === name) {
        const starIcon = restaurantItem.querySelector(
          ".star-icon-container img"
        ) as HTMLImageElement;
        if (starIcon) {
          starIcon.src = isFavorite
            ? "/public/favorite-icon-filled.png"
            : "/public/favorite-icon-lined.png";
        }
      }
    });
  },

  toggleFavorite: (name: string): void => {
    const isFavorite = restaurantHandler.updateFavoriteState(name);
    restaurantHandler.updateStarIconUI(name, isFavorite);
  },

  addFavoriteEvent: (listItem: HTMLElement, name: string) => {
    listItem
      .querySelector(".star-icon-container")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
        restaurantHandler.toggleFavorite(name);
      });
  },
};
