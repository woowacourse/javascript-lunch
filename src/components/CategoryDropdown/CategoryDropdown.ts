import BaseComponent from "../BaseComponent/BaseComponent";

import type { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../constants/selector";

import Dropdown from "../../utils/Dropdown";
import { $ } from "../../utils/dom";

class CategoryDropdown extends BaseComponent {
  private categoryDropdownConfig = {
    name: "category",
    id: "category-filter",
    className: "restaurant-filter",
    options: {
      contents: Object.values(MENU_CATEGORIES),
      values: Object.values(MENU_CATEGORIES),
    },
    eventType: CUSTOM_EVENT_TYPE.filterCategory,
    eventHandler: (event: Event) => {},
  };

  private dropdown = new Dropdown(this.categoryDropdownConfig);

  constructor() {
    super();
  }

  private eventListeners: CustomEventListenerDictionary = {
    categoryFilter: {
      eventName: "change",
      eventHandler: this.handleChangeCategoryFilter.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = this.dropdown.getInnerHTML();
  }

  private handleChangeCategoryFilter(event: Event) {
    const targetElement = event?.target;

    if (targetElement instanceof HTMLSelectElement) {
      const category = targetElement.value;

      this.emit(CUSTOM_EVENT_TYPE.filterCategory, category);
    }
  }

  protected setEvent(): void {
    this.dropdown.setEvent();

    this.on({
      ...this.eventListeners.categoryFilter,
      target: $(ELEMENT_SELECTOR.categoryFilter),
    });
  }

  protected removeEvent(): void {
    this.dropdown.removeEvent();

    this.off({
      ...this.eventListeners.categoryFilter,
      target: $(ELEMENT_SELECTOR.categoryFilter),
    });
  }
}

customElements.define("category-dropdown", CategoryDropdown);

export default CategoryDropdown;
