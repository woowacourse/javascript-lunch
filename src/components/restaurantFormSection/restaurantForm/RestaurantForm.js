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
import { extractValuesByKey } from "../../../utils/extractValuesByKey.js";

export default class RestaurantForm {
  constructor(updateList, list) {
    this.updateList = updateList;
    this.list = list;
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

    $addButton.disabled = true;
    $addButton.classList.add("disabled-btn");

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
      this.#closeModal.bind(this)
    );

    $form.addEventListener(EVENT_TYPES.submit, this.#handleSubmit.bind(this));
    $form.addEventListener(
      EVENT_TYPES.input,
      this.#handleFormChange.bind(this)
    );

    return $form;
  }

  #handleFormChange(e) {
    const category = document.querySelector("#category").value;
    const name = document.querySelector("#name").value;
    const distance = document.querySelector("#distance").value;
    const link = document.querySelector("#link").value;

    const $addButton = document.querySelector(".button--primary");

    if (category !== "" && name !== "" && distance !== "") {
      $addButton.disabled = false;
      $addButton.classList.remove("disabled-btn");
    }

    if ($addButton.classList.contains("disabled-btn")) return;

    if (link !== "" && !this.#validateLink(link)) {
      $addButton.disabled = true;
      $addButton.classList.add("disabled-btn");
    }
  }

  #validateLink(link) {
    try {
      new URL(link.trim());
      return true;
    } catch (err) {
      return false;
    }
  }

  #handleSubmit(e) {
    e.preventDefault();

    const formQuery = this.#getFormQuery();

    const newRestaurantInfo = extractValuesByKey(formQuery, "value");

    this.updateList([
      ...this.list,
      { ...newRestaurantInfo, bookmark: false, id: new Date().getTime() },
    ]);
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
