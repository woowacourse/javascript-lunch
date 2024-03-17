import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { CATEGORIES } from "../../constants/menu";
import { CategoryStringWithoutAll, SortOptionString } from "../../types/menu";

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
    return options.reduce(
      (accOptions, currOption) => accOptions + /*html*/ `<option value=${currOption}>${currOption}</option>;`,
      ""
    );
  }

  private isCategoryType(category: string): category is CategoryStringWithoutAll {
    return ["한식", "아시안", "일식", "중식", "양식", "기타"].includes(category);
  }

  private isSortType(category: string): category is SortOptionString {
    return ["이름순", "거리순"].includes(category);
  }

  private isValidOptionType(value: string) {
    return this.isCategoryType(value) || this.isSortType(value);
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

    this.innerHTML = /*html*/ `
      <select name="category" id="category-filter" class="restaurant-filter-select select-arrow-down arrow-down-black" aria-label="${
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
