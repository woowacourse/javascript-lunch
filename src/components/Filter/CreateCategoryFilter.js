import { CATEGORIES } from "../../constants/constants";
import { restaurantsData } from "../../../public/database/restaurants";
import RestaurantList from "../../Restaurant/RestaurantList";

const createCategoryFilter = (restaurantList) => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const categoryFilter = `<div>
  <select name="category" id="category-filter" class="restaurant-filter">
    <option value="전체" ${
      restaurantList.selectedCategory === "전체" ? "selected" : ""
    }>전체</option>
    ${CATEGORIES.map(
      (category) =>
        `<option value="${category}" ${
          category === restaurantList.selectedCategory ? "selected" : ""
        }>${category}</option>`
    ).join("")}
  </select>
  <p id="category-filter-result"></p>
</div>`;

  addrestaurant_filter_container.insertAdjacentHTML(
    "beforeend",
    categoryFilter
  );

  const selectElement = document.getElementById("category-filter");
  selectElement.addEventListener("change", (event) =>
    handleOnChange(event.target)
  );

  function handleOnChange(selectedCategory) {
    const text = selectedCategory.options[selectedCategory.selectedIndex].text;
    const selectedCategoryResult = document.getElementById(
      "category-filter-result"
    );
    showSelectedCategoryRestaurantList(text);
  }

  function showSelectedCategoryRestaurantList(selectedCategory) {
    restaurantList.setSelectedCategory(selectedCategory);
    restaurantList.createRestaurantList();
    const selectElement = document.getElementById("category-filter");
    selectElement.value = selectedCategory;
  }
};

export default createCategoryFilter;
