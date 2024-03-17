import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";

class RestaurantNameInput extends BaseComponent {
  private errorMessageClassList: DOMTokenList | null = null;

  constructor() {
    super();
  }

  private isValidName(value: string) {
    return restaurantValidator.isInRange(value, 0, 10);
  }

  private renderErrorMessage() {
    this.errorMessageClassList!.remove("hidden");
  }

  private hideErrorMessage() {
    this.errorMessageClassList!.add("hidden");
  }

  private handleErrorMessage(value: string) {
    this.isValidName(value)
      ? this.hideErrorMessage()
      : this.renderErrorMessage();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="form-item form-item--required" id="name-input">
        <label for="name">이름</label>
        <input type="text" name="name" id="name" class="text-caption">
        <p class="hidden text-caption error-message" id="name-error-message">1글자 이상 10글자 이하로 작성해주세요</p>
      </div>`;

    this.errorMessageClassList = $("#name-error-message")!.classList;
  }

  setEvent() {
    document.addEventListener(MENU_APP_EVENTS.restaurantFormSubmit, () => {
      const inputElement = $("#name");

      if (!(inputElement instanceof HTMLInputElement)) return;

      this.handleErrorMessage(inputElement.value);
    });

    $("#name")!.addEventListener("focusout", (event: Event) => {
      if (!(event.target instanceof HTMLInputElement)) return;

      this.handleErrorMessage(event.target.value);
    });
  }
}

customElements.define("restaurant-name-input", RestaurantNameInput);
