import BaseComponent from "../BaseComponent";
import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import { MENU_APP_EVENTS } from "../../constants/event";

class RestaurantOptions extends BaseComponent {
  private errorMessageClassList: DOMTokenList | null = null;

  constructor() {
    super();
  }

  private isSelected() {
    const id = this.getAttribute("id");

    const selectElement = $(`#${id}-select`);
    if (!(selectElement instanceof HTMLSelectElement)) return;

    return restaurantValidator.isSelected(selectElement.value);
  }

  private renderErrorMessage() {
    this.errorMessageClassList!.remove("hidden");
  }

  private hideErrorMessage() {
    this.errorMessageClassList!.add("hidden");
  }

  private handleErrorMessage() {
    this.isSelected() ? this.hideErrorMessage() : this.renderErrorMessage();
  }

  #createOptionHTML(options: string[], values: string[]) {
    return options.reduce(
      (accOptions, currOption, index) =>
        accOptions + `<option value=${values[index]}>${currOption}</option>;`,
      ""
    );
  }

  render() {
    const options = this.getAttribute("options")!.split(",");
    const values = this.getAttribute("values")!.split(",");
    const id = this.getAttribute("id") ?? "";
    const label = this.getAttribute("label") ?? "";

    this.innerHTML = /*html*/ `        
      <div class="form-item form-item--required">
          <label for="${id}-select">${label}</label>
          <select name="${id}" id=${id}-select class="select-arrow-down arrow-down-grey">
            ${this.#createOptionHTML(options, values)}
          </select>
          <p class="hidden text-caption error-message" id=${id}-select-error-message>옵션을 선택해주세요</p>
      </div>`;

    this.errorMessageClassList = $(`#${id}-select-error-message`)!.classList;
  }

  setEvent() {
    document.addEventListener(MENU_APP_EVENTS.restaurantFormSubmit, () => {
      this.handleErrorMessage();
    });
  }
}

customElements.define("restaurant-option", RestaurantOptions);
