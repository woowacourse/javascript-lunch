import BaseComponent from "../BaseComponent/BaseComponent";

import { SortCategory } from "./SortDropdown.type";

class SortDropdown extends BaseComponent {
  #sortCategories: SortCategory[] = ["이름순", "거리순"];

  protected render(): void {
    this.innerHTML = `
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
            ${this.createSortCategoryOptions()}
        </select>
    `;
  }

  protected setEvent(): void {}

  private createSortCategoryOptions() {
    return this.#sortCategories
      .map((sortCategory) => {
        return `<option value=${sortCategory}>${sortCategory}</option>`;
      })
      .join("");
  }
}

customElements.define("sort-dropdown", SortDropdown);
