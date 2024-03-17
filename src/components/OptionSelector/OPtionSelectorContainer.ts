import { MENU_APP_EVENTS } from "../../constants/event";
import { CATEGORIES, SORT_TYPE } from "../../constants/menu";
import { RestaurantTab } from "../../types/menu";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent";

class OptionSelectorContainer extends BaseComponent {
  protected render() {
    this.innerHTML = /*html*/ `
      <section id="option-selector-container" class="flex justify-between restaurant-filter-container">
        <option-selector type="category" options=${[...Object.values(CATEGORIES)]} ></option-selector>
        <option-selector type="sort" options=${[...Object.values(SORT_TYPE)]}></option-selector>
      </section>
    `;
  }

  private hideOptionSelector() {
    $<HTMLDivElement>("#option-selector-container")?.classList.add("hidden");
  }

  private handleOptionSelectorVisibility(tab: RestaurantTab) {
    if (!tab) return;
    tab === "favorite" ? this.hideOptionSelector() : this.render();
  }

  protected setEvent() {
    document.addEventListener(MENU_APP_EVENTS.changeTabState, (event) => {
      if (!(event instanceof CustomEvent)) return;

      const { tab } = event.detail;
      this.handleOptionSelectorVisibility(tab);
    });
  }
}

customElements.define("option-selector-container", OptionSelectorContainer);
