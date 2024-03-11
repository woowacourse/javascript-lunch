import RestaurantList from "./domain/RestaurantList";
import View from "./view";
import {
  getRestaurantsFromLocalStorage,
  setRestaurantsToLocalStorage,
} from "./util";

const restaurantList = new RestaurantList(getRestaurantsFromLocalStorage());

window.addEventListener("unload", () => {
  setRestaurantsToLocalStorage(
    restaurantList.getRestaurants({ category: "전체", sortingStandard: "name" })
  );
});

new View(document.querySelector("body") as HTMLBodyElement, restaurantList);
