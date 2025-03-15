import CategorySelector from "../components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "../components/FilterSelector/NameOrDistanceSelector";
import renderAllRestaurant from "../renderAllRestaurant";
import renderFilteredRestaurants from "../renderFilteredRestaurant";
import { $ } from "../utils/dom";

const renderAllpage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const filterContainer = $(".restaurant-filter-container");
  filterContainer.appendChild(CategorySelector(restaurantList));
  filterContainer.appendChild(NameOrDistanceSelector(restaurantList));

  renderFilteredRestaurants(restaurantList);
};

export default renderAllpage;
