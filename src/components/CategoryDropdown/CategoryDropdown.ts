import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../constants/selector";
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
            ${this.createMenuCategoryOptions()}
        </select>
    `;
  }

  private createMenuCategoryOptions() {
    return Object.values(CategoryDropdown.MENU_CATEGORIES)
      .map((menuCategory) => {
        return `<option value=${menuCategory}>${menuCategory}</option>`;
      })
      .join("");
  }

  protected setEvent(): void {
    this.on({
      target: $(ELEMENT_SELECTOR.categoryFilter),
      eventName: "change",
      eventHandler: this.handleChangeCategoryFilter.bind(this),
    });
  }

  private handleChangeCategoryFilter(event: Event) {
    const targetElement = event?.target;

    if (targetElement instanceof HTMLSelectElement) {
      const category = targetElement.value;

      this.emit(CUSTOM_EVENT_TYPE.filterCategory, category);
    }
  }
}

customElements.define("category-dropdown", CategoryDropdown);

export default CategoryDropdown;
