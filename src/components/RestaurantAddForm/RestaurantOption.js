import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import BaseComponent from "../BaseComponent";

class RestaurantOptions extends BaseComponent {
  #errorMessageClassList = null;

  constructor() {
    super();
  }

  #getOptionText(id) {
    if (id === "category") return "카테고리";
    if (id === "distance") return "거리(도보 이동 시간)";
  }

  #isSelected() {
    const id = this.getAttribute("id");
    return restaurantValidator.isSelected($(`#${id}-select`).value);
  }

  #renderErrorMessage() {
    this.#errorMessageClassList.remove("hidden");
  }

  #hideErrorMessage() {
    this.#errorMessageClassList.add("hidden");
  }

  #handleErrorMessage() {
    this.#isSelected() ? this.#hideErrorMessage() : this.#renderErrorMessage();
  }

  #createOptionHTML(options, values) {
    return options.reduce(
      (accOptions, currOption, index) =>
        accOptions + `<option value=${values[index]}>${currOption}</option>;`,
      ""
    );
  }

  render() {
    const options = this.getAttribute("options").split(",");
    const values = this.getAttribute("values").split(",");
    const id = this.getAttribute("id");
    const text = this.#getOptionText(id);

    this.innerHTML = `        
      <div class="form-item form-item--required">
          <label for="${id}-select">${text}</label>
          <select name="${id}" id=${id}-select class="select-arrow-down arrow-down-grey">
            ${this.#createOptionHTML(options, values)}
          </select>
          <p class="hidden text-caption error-message" id=${id}-select-error-message>옵션을 선택해주세요</p>
      </div>`;

    this.#errorMessageClassList = $(`#${id}-select-error-message`).classList;
  }

  setEvent() {
    document.addEventListener("add-form-submit", () => {
      this.#handleErrorMessage();
    });
  }
}

customElements.define("restaurant-option", RestaurantOptions);
