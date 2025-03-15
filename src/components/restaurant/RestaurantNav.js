import restaurantDataList, {
  VIEW_STATE,
} from "../../domain/RestaurantDataList.ts";
import createElement from "../../util/createElement";

export default function RestaurantNav() {
  const $nav = createElement({ tag: "nav", classNames: ["restaurant-nav"] });
  const $allRestaurant = createElement({
    tag: "div",
    classNames: ["restaurant-nav-item", "text-subtitle", "select"],
    name: "all-restaurant",
    textContent: "모든 음식점",
  });
  const $favoriteRestaurant = createElement({
    tag: "div",
    classNames: ["restaurant-nav-item", "text-subtitle"],
    name: "favorite-Restaurant",
    textContent: "자주 가는 음식점",
  });

  $allRestaurant.addEventListener("click", (e) => {
    if (e.target.name === "all-restaurant") return;
    $allRestaurant.classList.add("select");
    $favoriteRestaurant.classList.remove("select");

    restaurantDataList.setViewState(VIEW_STATE.all);
    restaurantDataList.renderRestaurantList();
  });

  $favoriteRestaurant.addEventListener("click", (e) => {
    if (e.target.name === "favorite-Restaurant") return;
    $allRestaurant.classList.remove("select");
    $favoriteRestaurant.classList.add("select");

    restaurantDataList.setViewState(VIEW_STATE.favorite);
    restaurantDataList.renderRestaurantList();
  });

  restaurantDataList.renderRestaurantList();
  $nav.append($allRestaurant, $favoriteRestaurant);
  return $nav;
}
