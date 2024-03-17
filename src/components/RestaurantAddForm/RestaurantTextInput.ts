import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";

interface InputValidator {
  name: (value: string) => boolean;
  link: (value: string) => boolean;
}

type TextInput = keyof InputValidator;

class RestaurantTextInput extends BaseComponent {
  private errorMessageClassList: DOMTokenList | null = null;

  private inputValidator: InputValidator = {
    name: this.isValidName.bind(this),
    link: restaurantValidator.isValidLink.bind(this),
  };

  constructor() {
    super();
  }

  private isValidName(value: string) {
    return restaurantValidator.isInRange(value, 0, 10);
  }

  private showErrorMessage() {
    this.errorMessageClassList!.remove("hidden");
  }

  private hideErrorMessage() {
    this.errorMessageClassList!.add("hidden");
  }

  private isValidTextType(value: string): value is TextInput {
    return ["name", "link"].includes(value);
  }

  private handleErrorMessage(value: string) {
    const inputType = this.getAttribute("input-type") ?? "";
    if (!this.isValidTextType(inputType)) return;

    const validator = this.inputValidator[inputType];
    validator(value) ? this.hideErrorMessage() : this.showErrorMessage();
  }

  render() {
    const labelText = this.getAttribute("label-text") ?? "";
    const inputType = this.getAttribute("input-type") ?? "";
    const errorMessage = this.getAttribute("error-message") ?? "";
    const description = this.getAttribute("description") ?? "";

    this.innerHTML = /*html*/ `
      <div class="form-item form-item--required">
        <label for="${inputType}-input">${labelText}</label>
        <input type="text" name="${inputType}" id="${inputType}-input" class="text-caption">
        ${
          description &&
          `<span class="help-text text-caption">${description}</span>`
        }
        <p class="hidden text-caption error-message" id="${inputType}-error-message">${errorMessage}</p>
      </div>`;

    this.errorMessageClassList = $(`#${inputType}-error-message`)!.classList;
  }

  setEvent() {
    document.addEventListener(MENU_APP_EVENTS.restaurantFormSubmit, () => {
      const inputType = this.getAttribute("input-type") ?? "";
      const inputElement = $<HTMLInputElement>(`#${inputType}-input`);
      if (!(inputElement instanceof HTMLInputElement)) return;

      this.handleErrorMessage(inputElement.value);
    });

    const inputType = this.getAttribute("input-type") ?? "";
    $(`#${inputType}-input`)!.addEventListener("focusout", (event: Event) => {
      if (!(event.target instanceof HTMLInputElement)) return;

      this.handleErrorMessage(event.target.value);
    });
  }
}

customElements.define("restaurant-text-input", RestaurantTextInput);
