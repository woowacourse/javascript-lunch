import BaseComponent from "../BaseComponent/BaseComponent";

import type { MenuCategory } from "./CategoryDropdown.type";

class CategoryDropdown extends BaseComponent {
  static menuCategories: MenuCategory[] = [
    "한식",
    "중식",
    "일식",
    "양식",
    "아시안",
    "기타",
  ];

  protected render(): void {
    this.innerHTML = `
        <select name="category" id="category-filter" class="restaurant-filter">
            <option value="전체">전체</option>
            ${this.createMenuCategoryOptions()}
        </select>
    `;
  }

  protected setEvent(): void {}

  private createMenuCategoryOptions() {
    return CategoryDropdown.menuCategories
      .map((menuCategory) => {
        return `<option value=${menuCategory}>${menuCategory}</option>`;
      })
      .join("");
  }
}

customElements.define("category-dropdown", CategoryDropdown);
