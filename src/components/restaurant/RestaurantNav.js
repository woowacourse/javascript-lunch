import restaurantDataList, { VIEW_STATE } from "../../domain/RestaurantList.ts";
import createElement from "../../util/createElement";
import restaurantUI from "../../domain/RestaurantUI.ts";

export default function RestaurantNav() {
  const $nav = createElement({ tag: "nav", classNames: ["restaurant-nav"] });
  const $allRestaurant = createElement({
    tag: "div",
    id: "all-restaurant",
    classNames: ["restaurant-nav-item", "text-subtitle", "select"],
    name: "all-restaurant",
    textContent: "모든 음식점",
  });
  const $favoriteRestaurant = createElement({
    tag: "div",
    id: "favorite-Restaurant",
    classNames: ["restaurant-nav-item", "text-subtitle"],
    name: "favorite-Restaurant",
    textContent: "자주 가는 음식점",
  });

  $allRestaurant.addEventListener("click", (e) => {
    if (e.target.name === "all-restaurant") return;
    $allRestaurant.classList.add("select");
    $favoriteRestaurant.classList.remove("select");

    restaurantUI.setViewState(VIEW_STATE.all);
    restaurantUI.renderRestaurantList();
  });

  $favoriteRestaurant.addEventListener("click", (e) => {
    if (e.target.name === "favorite-Restaurant") return;
    $allRestaurant.classList.remove("select");
    $favoriteRestaurant.classList.add("select");

    restaurantUI.setViewState(VIEW_STATE.favorite);
    restaurantUI.renderRestaurantList();
  });

  restaurantUI.renderRestaurantList();
  $nav.append($allRestaurant, $favoriteRestaurant);
  return $nav;
}
