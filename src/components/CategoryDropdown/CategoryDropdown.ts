import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../constants/selector";
import { createOptionElements } from "../../utils/createOptionElements";
import { $ } from "../../utils/dom";

import BaseComponent from "../BaseComponent/BaseComponent";

class CategoryDropdown extends BaseComponent {
  protected render(): void {
    this.innerHTML = `
        <select name="category" id="category-filter" class="restaurant-filter">
            ${createOptionElements(Object.values(MENU_CATEGORIES))}
        </select>
    `;
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
