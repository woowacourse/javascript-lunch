import $restaurantItem from "./restaurantItem";
import { STORAGE_KEY_NAME } from "../../constants/storage";
import { storageHandler } from "../../utils/storageHandler";
import { Category, IRestaurant, Sort } from "../../types/types";

const $restaurantList = (restaurantItems: IRestaurant[]) => {
  if (restaurantItems.length > 0) {
    const restaurantList = document.createElement("ul");
    restaurantList.classList.add("restaurant-list");

    restaurantItems.forEach((item) => {
      restaurantList.appendChild($restaurantItem(item));
    });

    return restaurantList;
  }

  const noRestaurant = document.createElement("div");
  noRestaurant.classList.add("no-restaurant");

  const noRestaurantIcon = document.createElement("i");
  noRestaurantIcon.textContent = "🍽️";
  const noRestaurantText = document.createElement("b");
  noRestaurantText.textContent = "등록된 음식점이 없습니다.";

  noRestaurant.appendChild(noRestaurantIcon);
  noRestaurant.appendChild(noRestaurantText);

  return noRestaurant;
};

const $createRestaurantList = () => {
  const restaurantContainer = document.querySelector(
    ".restaurant-list-container"
  );
  restaurantContainer?.replaceChildren();

  const categoryFilter = (
    document.getElementById("category-filter") as HTMLSelectElement
  )?.value as Category;
  const sortFilter = (
    document.getElementById("sorting-filter") as HTMLSelectElement
  )?.value as Sort;
  const restaurantItems = storageHandler.filterItem(
    STORAGE_KEY_NAME,
    categoryFilter,
    sortFilter,
    document.querySelector(".select-tab-active")!.id
  );

  restaurantContainer?.appendChild($restaurantList(restaurantItems));
};

export default $createRestaurantList;
