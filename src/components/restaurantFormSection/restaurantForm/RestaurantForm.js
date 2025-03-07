import Button from "../../common/button/Button.js";
import LinkInput from "../linkInput/LinkInput.js";
import NameInput from "../nameInput/NameInput.js";
import DescriptionInput from "../descriptionInput/DescriptionInput.js";
import RestaurantListItem from "../../restaurantListSection/restaurantListItem/RestaurantListItem.js";
import CategorySelect from "../categorySelect/CategorySelect.js";
import DistanceSelect from "../distanceSelect/DistanceSelect.js";
import "./restaurantForm.css";
import {
  EVENT_TYPES,
  BUTTON_TEXTS,
  BUTTON_TYPES,
} from "../../../constants/constants.js";

export default class RestaurantForm {
  constructor(addList) {
    this.addList = addList;
  }

  render() {
    const $form = document.createElement("form");

    const $categoryFormItem = new CategorySelect().render();
    const $nameFormItem = new NameInput().render();
    const $distanceFormItem = new DistanceSelect().render();
    const $descriptionFormItem = new DescriptionInput().render();
    const $linkFormItem = new LinkInput().render();

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

    $form.appendChild($categoryFormItem);
    $form.appendChild($nameFormItem);
    $form.appendChild($distanceFormItem);
    $form.appendChild($descriptionFormItem);
    $form.appendChild($linkFormItem);
    $form.appendChild($buttonContainer);

    $buttonContainer.appendChild($cancelButton);
    $buttonContainer.appendChild($addButton);

    $cancelButton.addEventListener(
      EVENT_TYPES.click,
      this.#handleCancelButtonClick.bind(this)
    );

    $form.addEventListener(EVENT_TYPES.submit, this.#handleSubmit.bind(this));

    return $form;
  }

  #handleCancelButtonClick() {
    const $modal = document.querySelector(".modal");
    $modal.classList.remove("modal--open");
  }

  #handleSubmit(e) {
    e.preventDefault();

    const formQuery = this.#getFormQuery();

    const newRestaurantInfo = Object.entries(formQuery).reduce(
      (acc, [key, query]) => {
        acc[key] = query.value;
        return acc;
      },
      {}
    );

    this.addList(newRestaurantInfo);
    this.#resetFormData(formQuery);
    this.#closeModal();
  }

  #getFormQuery() {
    const category = document.querySelector("#category");
    const name = document.querySelector("#name");
    const distance = document.querySelector("#distance");
    const description = document.querySelector("#description");
    const link = document.querySelector("#link");

    return { category, name, distance, description, link };
  }

  #resetFormData({ category, name, distance, description, link }) {
    category.value = "";
    name.value = "";
    distance.value = "";
    description.value = "";
    link.value = "";
  }

  #closeModal() {
    const $modal = document.querySelector(".modal");
    $modal.classList.remove("modal--open");
  }
}
