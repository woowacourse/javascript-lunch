import CategorySelector from "../components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "../components/FilterSelector/NameOrDistanceSelector";
import renderFilteredRestaurants from "./renderFilteredRestaurant";
import { $ } from "../utils/dom";
import Persistence from "../domain/persistence/Persistence";

const renderAllpage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const filterContainer = $(".restaurant-filter-container");

  filterContainer.appendChild(
    CategorySelector(handleSeletedCatetoryChanged(restaurantList))
  );

  filterContainer.appendChild(
    NameOrDistanceSelector(handleNameOrDistanceChanged(restaurantList))
  );

  return renderFilteredRestaurants(restaurantList);
};

export default renderAllpage;

const handleSeletedCatetoryChanged = (restaurantList) => (e) => {
  Persistence.saveCategory(e.target.value);
  restaurantList.category = e.target.value;
  renderFilteredRestaurants(restaurantList);
};

const handleNameOrDistanceChanged = (restaurantList) => (e) => {
  Persistence.saveNameOrDistance(e.target.value);
  restaurantList.nameOrDistance = e.target.value;
  renderFilteredRestaurants(restaurantList);
};
