import Component from "./Component.js";
import Dropdown from "./Dropdown.js";
import Input from "./Input.js";
import { categoryValue, distanceValue } from "./optionValue.js";
import { RestaurantData } from "./RestaurantData.js";
class Modal extends Component {
  constructor($target) {
    super($target);
  }

  template() {
    return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='input-form'>

      <div id="category" class="form-item form-item--required"></div>

        <div id="name" class="form-item form-item--required">
        </div>

        <div id="distance" class="form-item form-item--required"></div>

        <div id="description" class="form-item"></div>

        <div id="link" class="form-item"></div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    new Dropdown(document.getElementById("category"), categoryValue);
    new Input(document.getElementById("name"), "required");
    new Dropdown(document.getElementById("distance"), distanceValue);
    new Input(document.getElementById("description"), "");
    new Input(document.getElementById("link"), "");
  }

  setEvent() {
    this.$target
      .querySelector(".button.button--secondary.text-caption")
      .addEventListener("click", () => {
        const modalContainer = document.querySelector(".modal");
        modalContainer.classList.toggle("modal--open");
      });
    this.submitForm();
  }

  submitForm() {
    document
      .getElementById("input-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const modalContainer = document.querySelector(".modal");
        modalContainer.classList.toggle("modal--open");
        const formData = new FormData(document.getElementById("input-form"));
        const submittedData = Object.fromEntries(formData);
        const information = {
          name: submittedData.name,
          distance: Number(submittedData.distance),
          description: submittedData.description,
          imgSrc: `../templates/category-${submittedData.category}.png`,
          imgAlt: `${categoryValue[submittedData.category]}`,
        };

        RestaurantData.push(information);
        document.dispatchEvent(new CustomEvent("restaurantUpdated"));
      });
  }
}

export default Modal;
