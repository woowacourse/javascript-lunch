import RestaurantCardList from "./RestaurantCardList";
import OPTIONS from "../constants/options";

type SelectId = keyof typeof OPTIONS;

class RestaurantOptionSelect extends HTMLSelectElement {
  static get observedAttributes() {
    return ["hasFilterEvent"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    const id = this.getAttribute("id");

    if (id === null) return;
    if (!this.isSelectId(id)) return;

    this.innerHTML = `
      ${OPTIONS[id].text
        .map(
          (optionText, index) =>
            `<option value=${OPTIONS[id].value[index]}>${optionText}</option>`
        )
        .join("")}
    `;
  }

  bindEvent() {
    if (!this.hasEvent()) return;

    this.addEventListener("change", this.onChangeFilterSelect.bind(this));
  }

  isSelectId(id: string): id is SelectId {
    return Object.keys(OPTIONS).includes(id);
  }

  hasEvent() {
    return this.getAttribute("hasFilterEvent") !== null;
  }

  onChangeFilterSelect(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const $restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");
    $restaurantCardList?.setAttribute(event.target.id, event.target.value);
  }
}

export default RestaurantOptionSelect;
