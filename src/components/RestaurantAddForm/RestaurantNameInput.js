import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import BaseComponent from "../BaseComponent";

class RestaurantNameInput extends BaseComponent {
  #errorMessageClassList = null;

  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <div class="form-item form-item--required" id="name-input">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="text-caption">
        <p class="hidden text-caption error-message" id="name-error-message">1글자 이상 10글자 이하로 작성해주세요</p>
      </div>`;

    this.#errorMessageClassList = $("#name-error-message").classList;
  }

  #isValidName(value) {
    return restaurantValidator.isInRange(value, 0, 10);
  }

  #renderErrorMessage() {
    this.#errorMessageClassList.remove("hidden");
  }

  #hideErrorMessage() {
    this.#errorMessageClassList.add("hidden");
  }

  #handleErrorMessage(value) {
    this.#isValidName(value)
      ? this.#hideErrorMessage()
      : this.#renderErrorMessage();
  }

  setEvent() {
    document.addEventListener("add-form-submit", () => {
      this.#handleErrorMessage($("#name").value);
    });

    $("#name").addEventListener("focusout", (e) => {
      this.#handleErrorMessage(e.target.value);
    });
  }
}

customElements.define("restaurant-name-input", RestaurantNameInput);
