import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../constants/selector";
import { createOptionElements } from "../../utils/createOptionElements";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent/BaseComponent";

import { SortCategory, SortKey } from "./SortDropdown.type";

class SortDropdown extends BaseComponent {
  static SORT_CATEGORIES_TYPE: Record<SortKey, SortCategory> = {
    name: "이름순",
    distance: "거리순",
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
      target: $(ELEMENT_SELECTOR.sortingFilter),
      eventName: "change",
      eventHandler: this.handleChangeSort.bind(this),
    });
  }

  private handleChangeSort(event: Event): void {
    let selectedOption = "";

    if (event?.target instanceof HTMLSelectElement) {
      selectedOption = event.target.value;
    }

    this.emit(CUSTOM_EVENT_TYPE.sortChange, selectedOption);
  }

  protected removeEvent(): void {
    this.off({
      target: $(ELEMENT_SELECTOR.sortingFilter),
      eventName: "change",
      eventHandler: this.handleChangeSort.bind(this),
    });
  }
}

customElements.define("sort-dropdown", SortDropdown);

export default SortDropdown;
