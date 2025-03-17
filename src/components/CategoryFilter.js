import RESTAURANT_RULES from "../constants/rules.js";

const CategoryFilter = () => {
  const categoryFilters = ["전체", ...RESTAURANT_RULES.CATEGORIES];

  return /*html*/ `
    <select name="category" id="category-filter" class="restaurant-filter" data-testid="category-filter">
    ${categoryFilters
      .map(
        (categoryFilter) =>
          `<option value="${categoryFilter}">${categoryFilter}</option>`
      )
      .join("")}
    </select>
  `;
};
export default CategoryFilter;
