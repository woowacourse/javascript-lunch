import { CATEGORY_NAME } from "../constants/CATEGORY_NAME";
import { TCategory } from "../type/TCategory";
import RestaurantList from "./RestaurantList";

class CategorySelectBox extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
    <select name="category" id="category-filter" class="restaurant-filter">
      <option value="all">전체</option>
      ${Object.entries(CATEGORY_NAME)
        .map((value) => `<option value="${value[0]}">${value[1]}</option>`)
        .join("")}
    </select>
      `;
  }

  onSelectOption() {
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter instanceof HTMLSelectElement) {
      categoryFilter.addEventListener("change", () => {
        this.filterCategory(categoryFilter.value as TCategory);
      });
    }
  }

  filterCategory(key: TCategory) {
    const restaurantList = document.getElementById("restaurantList");
    if (restaurantList instanceof RestaurantList) {
      restaurantList.filterBy(key);
    }
  }
}

export default CategorySelectBox;
