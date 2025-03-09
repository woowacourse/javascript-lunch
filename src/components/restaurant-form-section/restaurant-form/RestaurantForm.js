import Button from "../../common/button/Button.js";
import LinkInput from "../link-input/LinkInput.js";
import NameInput from "../name-input/NameInput.js";
import DescriptionInput from "../description-input/DescriptionInput.js";
import RestaurantListItem from "../../restaurant-list-section/restaurant-list-item/RestaurantListItem.js";
import CategorySelect from "../category-select/CategorySelect.js";
import DistanceSelect from "../distance-select/DistanceSelect.js";
import "./restaurantForm.css";
import {
  EVENT_TYPES,
  BUTTON_TEXTS,
  BUTTON_TYPES,
} from "../../../constants/constants.js";

export default class RestaurantForm {
  constructor({ onSubmit, onCancel }) {
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;
    this.formElements = {
      category: new CategorySelect().render(),
      name: new NameInput().render(),
      distance: new DistanceSelect().render(),
      description: new DescriptionInput().render(),
      link: new LinkInput().render(),
    };
  }

  render() {
    const $form = document.createElement("form");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $cancelButton = new Button({
      text: BUTTON_TEXTS.cancel,
      action: BUTTON_TYPES.cancel,
    }).render();
    const $addButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.add,
      action: BUTTON_TYPES.add,
    }).render();

    $form.append(
      this.formElements.category,
      this.formElements.name,
      this.formElements.distance,
      this.formElements.description,
      this.formElements.link,
      $buttonContainer
    );

    $buttonContainer.append($cancelButton, $addButton);

    $cancelButton.addEventListener(EVENT_TYPES.click, this.onCancel.bind(this));

    $form.addEventListener(EVENT_TYPES.submit, this.#handleSubmit.bind(this));

    return $form;
  }

  #handleSubmit(e) {
    e.preventDefault();

    const newRestaurantInfo = this.#getFormData();

    this.onSubmit(newRestaurantInfo);
    this.#resetFormData();
  }

  #getFormData() {
    return Object.entries(this.formElements).reduce((acc, [key, el]) => {
      acc[key] = el.querySelector("input, select, textarea").value;
      return acc;
    }, {});
  }

  #resetFormData() {
    Object.values(this.formElements).forEach((el) => {
      const query = el.querySelector("input, select, textarea");
      if (query) query.value = "";
    });
  }
}
