import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import BaseComponent from "../BaseComponent";

class RestaurantNameInput extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <div class="form-item form-item--required" id="name-input">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="text-caption">
        <p class="hidden text-caption error-message" id="error-message">1글자 이상 10글자 이하로 작성해주세요</p>
      </div>`;
  }

  #isValidName(value) {
    return restaurantValidator.isInRange(value, 0, 10);
  }

  setEvent() {
    document.addEventListener("add-form-submit", (e) => {
      this.#isValidName($("#name").value)
        ? $("#error-message").classList.add("hidden")
        : $("#error-message").classList.remove("hidden");
    });

    $("#name").addEventListener("focusout", (e) => {
      this.#isValidName(e.target.value)
        ? $("#error-message").classList.add("hidden")
        : $("#error-message").classList.remove("hidden");
    });
  }
}

customElements.define("restaurant-name-input", RestaurantNameInput);