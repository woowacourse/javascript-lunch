import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../constants/selector";
import { createOptionElements } from "../../utils/createOptionElements";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent/BaseComponent";
import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import { SortCategory, SortKey } from "./SortDropdown.type";

class SortDropdown extends BaseComponent {
  static SORT_CATEGORIES_TYPE: Record<SortKey, SortCategory> = {
    name: "이름순",
    distance: "거리순",
  };

  private eventListeners: CustomEventListenerDictionary = {
    sortingFilterChange: {
      eventName: "change",
      eventHandler: this.handleChangeSort.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = `
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
            ${createOptionElements(
              Object.values(SortDropdown.SORT_CATEGORIES_TYPE)
            )}
        </select>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.sortingFilterChange,
      target: $(ELEMENT_SELECTOR.sortingFilter),
    });
  }

  private handleChangeSort(event: Event): void {
    const targetElement = event?.target;

    if (targetElement instanceof HTMLSelectElement) {
      const selectedOption = targetElement.value;

      this.emit(CUSTOM_EVENT_TYPE.sortChange, selectedOption);
    }
  }

  protected removeEvent(): void {
    this.on({
      ...this.eventListeners.sortingFilterChange,
      target: $(ELEMENT_SELECTOR.sortingFilter),
    });
  }
}

customElements.define("sort-dropdown", SortDropdown);

export default SortDropdown;
