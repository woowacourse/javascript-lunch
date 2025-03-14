import Button from "../../common/button/Button.js";
import LinkInput from "../link-input/LinkInput.js";
import NameInput from "../name-input/NameInput.js";
import DescriptionInput from "../description-input/DescriptionInput.js";
import SelectBox from "../../common/select-box/SelectBox.js";
import "./restaurantForm.css";
import {
  CATEGORY,
  DISTANCE,
  EVENT_TYPES,
  BUTTON_TEXTS,
  BUTTON_TYPES,
} from "../../../constants/constants.js";

export default class RestaurantForm {
  constructor({ title, onSubmit, onCancel }) {
    this.title = title;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;

    this.formElements = {
      category: new SelectBox({
        label: "category",
        options: CATEGORY.slice(1, CATEGORY.length),
      }).render(),
      name: new NameInput().render(),
      distance: new SelectBox({
        label: "distance",
        options: DISTANCE,
      }).render(),
      description: new DescriptionInput().render(),
      link: new LinkInput().render(),
    };
  }

  render() {
    const $fragment = new DocumentFragment();

    const $title = this.#renderTitle();
    const $form = this.#renderForm();

    $fragment.append($title, $form);

    return $fragment;
  }

  #renderTitle() {
    const $title = document.createElement("h2");
    $title.className = "modal-title text-title";
    $title.textContent = this.title;

    return $title;
  }

  #renderForm() {
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

    $buttonContainer.append($cancelButton, $addButton);
    $form.append(
      this.formElements.category,
      this.formElements.name,
      this.formElements.distance,
      this.formElements.description,
      this.formElements.link,
      $buttonContainer
    );

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
