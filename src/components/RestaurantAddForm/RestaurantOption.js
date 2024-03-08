import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent";

class RestaurantOptions extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const optionsArray = this.getAttribute("options").split(",");
    const valuesArray = this.getAttribute("values").split(",");
    const id = this.getAttribute("id");

    this.innerHTML = `        
    <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        <select name="category" id=${id}-select>
        ${optionsArray.map((option, index) => {
          return `<option value=${valuesArray[index]}>${option}</option>;`;
        })}
        </select>
        <p class="hidden" id=${id}-select-error-message>옵션을 선택해주세요</p>
    </div>`;
  }

  #isSelected() {
    const id = this.getAttribute("id");
    return $(`#${id}-select`).value === "";
  }

  setEvent() {
    const id = this.getAttribute("id");
    document.addEventListener("add-form-submit", (e) => {
      this.#isSelected()
        ? $(`#${id}-select-error-message`).classList.remove("hidden")
        : $(`#${id}-select-error-message`).classList.add("hidden");
    });
  }
}

customElements.define("restaurant-option", RestaurantOptions);
