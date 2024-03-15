import BaseComponent from "../BaseComponent/BaseComponent";
import type { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";
import { ELEMENT_SELECTOR } from "../../constants/selector";

import Dropdown from "../../utils/Dropdown";
import { $ } from "../../utils/dom";

class SortDropdown extends BaseComponent {
  private sortDropdownConfig = {
    name: "sorting",
    id: "sorting-filter",
    className: "restaurant-filter",
    options: {
      contents: Object.values(SORT_CATEGORIES_TYPE),
      values: Object.values(SORT_CATEGORIES_TYPE),
    },
    eventType: CUSTOM_EVENT_TYPE.sortChange,
    eventHandler: (event: Event) => {},
  };

  private eventListeners: CustomEventListenerDictionary = {
    sortingFilterChange: {
      eventName: "change",
      eventHandler: this.handleChangeSort.bind(this),
    },
  };

  private dropdown = new Dropdown(this.sortDropdownConfig);

  constructor() {
    super();
  }

  protected render(): void {
    this.innerHTML = this.dropdown.getTemplate();
  }

  private handleChangeSort(event: Event) {
    const targetElement = event?.target;

    if (targetElement instanceof HTMLSelectElement) {
      const selectedOption = targetElement.value;

      this.emit(CUSTOM_EVENT_TYPE.sortChange, selectedOption);
    }
  }

  protected setEvent(): void {
    this.dropdown.setEvent();

    this.on({
      ...this.eventListeners.sortingFilterChange,
      target: $(ELEMENT_SELECTOR.sortingFilter),
    });
  }
}

customElements.define("sort-dropdown", SortDropdown);

export default SortDropdown;
