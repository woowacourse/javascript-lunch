import { categoryFilterValue, sortingValue } from "../constants/optionValue.js";
import FilterDropdown from "./Dropdown/FilterDropdown.js";
import { RestaurantData } from "../constants/RestaurantData.js";
import filterByCategory from "./filterRestaurants.js";
import renderRestaurants from "./renderRestaurants.js";
const createFilterSelect = (filter: string) => {
  if (filter === "category") {
    return new FilterDropdown(
      document.querySelector(".restaurant-filter-container"),
      {
        id: "category",
        optionValue: categoryFilterValue,
        onChange: (selectedCategory: string) => {
          const filteredRestaurants = filterByCategory(
            RestaurantData,
            selectedCategory,
          );
          renderRestaurants(filteredRestaurants);
        },
      },
    );
  }
};

export default createFilterSelect;
