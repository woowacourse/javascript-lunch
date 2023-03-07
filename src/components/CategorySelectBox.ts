import { categoryOptions } from "../domain/restaurant";
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
      ${categoryOptions()}
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
