import Button from "../../common/button/Button.js";
import LinkInput from "../linkInput/LinkInput.js";
import RestaurantNameInput from "../restaurantNameInput/RestaurantNameInput.js";
import DescriptionInput from "../descriptionInput/DescriptionInput.js";
import RestaurantListItem from "../../restaurantListSection/restaurantListItem/RestaurantListItem.js";
import CategorySelect from "../categorySelect/CategorySelect.js";
import DistanceSelect from "../distanceSelect/DistanceSelect.js";
import "./restaurantForm.css";
import { EVENT_TYPES, BUTTON_TEXTS } from "../../../constants/constants.js";

export default class RestaurantForm {
  render() {
    const $form = document.createElement("form");

    const $categoryFormItem = new CategorySelect().render();
    const $restaurantFormItem = new RestaurantNameInput().render();
    const $distanceFormItem = new DistanceSelect().render();
    const $descriptionFormItem = new DescriptionInput().render();
    const $linkFormItem = new LinkInput().render();

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $cancelButton = new Button({
      text: BUTTON_TEXTS.cancel,
      action: "cancel",
    }).render();
    const $addButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.add,
      action: "add",
    }).render();

    $form.appendChild($categoryFormItem);
    $form.appendChild($restaurantFormItem);
    $form.appendChild($distanceFormItem);
    $form.appendChild($descriptionFormItem);
    $form.appendChild($linkFormItem);
    $form.appendChild($buttonContainer);

    $buttonContainer.appendChild($cancelButton);
    $buttonContainer.appendChild($addButton);

    $cancelButton.addEventListener(EVENT_TYPES.click, () => {
      const $modal = document.querySelector(".modal");
      $modal.classList.remove("modal--open");
    });

    $form.addEventListener(EVENT_TYPES.submit, (e) => {
      e.preventDefault();

      const category = document.querySelector("#category");
      const name = document.querySelector("#name");
      const distance = document.querySelector("#distance");
      const description = document.querySelector("#description");
      const link = document.querySelector("#link");

      const $restaurantItem = new RestaurantListItem({
        category: category.value,
        name: name.value,
        distance: distance.value,
        description: description.value,
        link: link.value,
      }).render();

      const $restaurantList = document.querySelector(".restaurant-list");
      $restaurantList.appendChild($restaurantItem);

      category.value = "";
      name.value = "";
      distance.value = "";
      description.value = "";
      link.value = "";

      const $modal = document.querySelector(".modal");
      $modal.classList.remove("modal--open");
    });

    return $form;
  }
}
