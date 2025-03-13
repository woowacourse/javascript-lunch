import { CATEGORIES } from "../../constants/constants";
import { restaurantsData } from "../../constants/restaurantsMockData";
import renderRestaurantElement from "../../Restaurant/RestaurantItem";

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
  if (selectedCategory === "전체") {
    console.log(selectedCategory);
  }
}

export default createCategoryFilter;

// function handleOnChange(selectedCategory) {
//   const restaurantList = document.querySelector(".restaurant-list");
//   restaurantList.innerHTML = "";

//   const filteredData = selectedCategory === "전체"
//     ? restaurantsData // "전체"를 선택하면 모든 데이터를 표시
//     : restaurantsData.filter((restaurant) => restaurant.category === selectedCategory);

//   filteredData.forEach((restaurantData) => {
//     const restaurantItem = renderRestaurantElement(restaurantData);
//     restaurantList.appendChild(restaurantItem);
//   });
// }
