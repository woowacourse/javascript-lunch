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
  console.log("전체0000");
}

function showSelectedCategoryRestaurantList(selectedCategory) {
  if (selectedCategory === "전체") {
    console.log("전체");
  }
}

export default createCategoryFilter;
