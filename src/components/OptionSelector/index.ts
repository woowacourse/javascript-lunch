import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { CategoryString, SortOptionString } from "../../types/menu";
import { isArrayElement } from "../../utils/types";
import { CATEGORIES, SORT_TYPE } from "../../constants/menu";

interface OptionDetail {
  type: string;
  option: string;
}

class OptionSelector extends BaseComponent {
  private selectType;

  constructor() {
    super();
    this.selectType = this.getAttribute("type");
  }

  private createOptionHTML(options: string[]) {
    return options.reduce((accOptions, currOption) => accOptions + /*html*/ `<option value=${currOption}>${currOption}</option>;`, "");
  }

  private isValidOptionType(value: string): value is CategoryString | SortOptionString {
    return isArrayElement<CategoryString>(Object.values(CATEGORIES), value) || isArrayElement<SortOptionString>(Object.values(SORT_TYPE), value);
  }

  private handleChangeOption(element: HTMLSelectElement) {
    const selectedValue = element.value;
    if (!this.isValidOptionType(selectedValue)) return;

    this.emitEvent<OptionDetail>(MENU_APP_EVENTS.selectChange, {
      type: this.selectType ?? "",
      option: selectedValue,
    });
  }

  render() {
    const options = this.getAttribute("options")!.split(",");
    this.selectType = this.getAttribute("type");

    this.innerHTML = /*html*/ `
      <select name="category" id="${this.selectType}-option-select" class="restaurant-filter-select select-arrow-down arrow-down-black" aria-label="${
      this.selectType
    }-select">
        ${this.createOptionHTML(options)}
      </select> 
    `;
  }

  setEvent() {
    this.addEventListener("change", (event: Event) => {
      if (!(event.target instanceof HTMLSelectElement)) {
        return;
      }

      this.handleChangeOption(event.target);
    });
  }
}

customElements.define("option-selector", OptionSelector);
