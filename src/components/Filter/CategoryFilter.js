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
    )}
  </select>
  `;

  addrestaurant_filter_container.insertAdjacentHTML(
    "beforeend",
    categoryFilter
  );
};

export default createCategoryFilter;
