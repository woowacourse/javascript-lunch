import styleClass from "../constants/styleClass";
import { categoryOptions } from "../domain/restaurant";
import { restaurants } from "../domain/restaurants";
import { TCategory } from "../type/TCategory";

class CategorySelectBox extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
    <select name="category" id="category-filter" class="${styleClass.restaurant.filter}">
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
    restaurants.state.filter = key;
  }
}

export default CategorySelectBox;
