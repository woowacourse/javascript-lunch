import RestaurantHeader from "./RestaurantHeader.js";
import RestaurantListContainer from "./RestaurantListContainer.js";
import RestaurantNav from "./RestaurantNav.js";
import restaurantDataList from "../../domain/RestaurantDataList.ts";
import RestaurantFilters from "./RestaurantFilters.js";

export default function RestaurantApp() {
  const $restaurantHeader = RestaurantHeader({ title: "점심 뭐 먹지" });

  const $restaurantFilters = RestaurantFilters();

  const $restaurantListContainer = RestaurantListContainer();

  const $restaurantNav = RestaurantNav();

  document.body.appendChild($restaurantHeader);
  document.body.appendChild($restaurantNav);
  document.body.appendChild($restaurantFilters);
  document.body.appendChild($restaurantListContainer);
}
