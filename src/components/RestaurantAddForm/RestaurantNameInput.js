import { $ } from "../../utils/dom";
import restaurantValidator from "../../validators/restaurantValidator";
import BaseComponent from "../BaseComponent";

class RestaurantNameInput extends BaseComponent {
  render() {
    this.innerHTML = `
      <div class="form-item form-item--required" id="name-input">
      </div>
      `;
    this.#createInputHtml();
  }

  #createInputHtml() {
    const formItem = $("#name-input");

    const label = document.createElement("label");
    label.setAttribute("for", "name");
    label.textContent = "이름";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";
    input.className = "text-caption";

    const errorMessage = document.createElement("p");
    errorMessage.className = "hidden text-caption error-message";
    errorMessage.id = "error-message";
    errorMessage.textContent = "1글자 이상 10글자 이하로 작성해주세요";

    formItem.appendChild(label);
    formItem.appendChild(input);
    formItem.appendChild(errorMessage);

    formItem.appendChild(label);
    formItem.appendChild(input);
    formItem.appendChild(errorMessage);
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
