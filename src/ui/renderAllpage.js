import CategorySelector from "../components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "../components/FilterSelector/NameOrDistanceSelector";
import renderFilteredRestaurants from "./renderFilteredRestaurant";
import { $ } from "../utils/dom";
import storage from "../domain/storage";

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
  storage.saveCategory(e.target.value);
  restaurantList.category = e.target.value;
  renderFilteredRestaurants(restaurantList);
};

const handleNameOrDistanceChanged = (restaurantList) => (e) => {
  storage.saveNameOrDistance(e.target.value);
  restaurantList.nameOrDistance = e.target.value;
  renderFilteredRestaurants(restaurantList);
};
