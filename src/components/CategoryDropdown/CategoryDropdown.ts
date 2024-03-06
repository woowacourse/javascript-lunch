import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent/BaseComponent";

import type { MenuCategoryDictionary } from "./CategoryDropdown.type";

class CategoryDropdown extends BaseComponent {
  static MENU_CATEGORIES: MenuCategoryDictionary = {
    all: "전체",
    korean: "한식",
    chinese: "중식",
    japanese: "일식",
    western: "양식",
    asian: "아시안",
    others: "기타",
  } as const;

  protected render(): void {
    this.innerHTML = `
        <select name="category" id="category-filter" class="restaurant-filter">
            <option value="전체">전체</option>
            ${this.createMenuCategoryOptions()}
        </select>
    `;
  }

  protected setEvent(): void {
    this.on({
      target: $("#category-filter"),
      eventName: "change",
      eventHandler: this.handleChangeCategoryFilter.bind(this),
    });
  }

  private handleChangeCategoryFilter(event: Event) {
    if (event?.target instanceof HTMLSelectElement) {
      const category = event.target.value;

      this.emit(CUSTOM_EVENT_TYPE.filterCategory, category);
    }
  }

  private createMenuCategoryOptions() {
    return Object.values(CategoryDropdown.MENU_CATEGORIES)
      .map((menuCategory) => {
        if (menuCategory === CategoryDropdown.MENU_CATEGORIES.all) return;

        return `<option value=${menuCategory}>${menuCategory}</option>`;
      })
      .join("");
  }
}

customElements.define("category-dropdown", CategoryDropdown);

export default CategoryDropdown;
