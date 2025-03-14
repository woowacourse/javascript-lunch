import { CATEGORIES } from "../../constants/constants";
import { restaurantsData } from "../../constants/restaurantsMockData";
import RestaurantList from "../../Restaurant/RestaurantList";

const createCategoryFilter = () => {
  const addrestaurant_filter_container = document.querySelector(
    ".restaurant-filter-container"
  );
  const categoryFilter = `
  <select name="category" id="category-filter" class="restaurant-filter">
    <option value="전체">전체</option>
    ${CATEGORIES.map(
      (category) => `<option value="${category}">${category}</option>`
    ).join("")}
  </select>
  <p id="result"></p>
  `;

  addrestaurant_filter_container.insertAdjacentHTML(
    "beforeend",
    categoryFilter
  );

  const selectElement = document.getElementById("category-filter");
  selectElement.addEventListener("change", (event) =>
    handleOnChange(event.target)
  );
};

function handleOnChange(selectedCategory) {
  const text = selectedCategory.options[selectedCategory.selectedIndex].text;
  const selectedCategoryResult = document.getElementById("result");
  showSelectedCategoryRestaurantList(text);
}

function showSelectedCategoryRestaurantList(selectedCategory) {
  const restaurantList = new RestaurantList(selectedCategory);
  restaurantList.createRestaurantList();
}

export default createCategoryFilter;

// const newArray = array.filter((element) => 조건);
