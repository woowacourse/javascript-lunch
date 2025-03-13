import { CATEGORIES } from "../../constants/constants";

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
