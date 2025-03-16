import $button from "../common/button.js";
import $buttonContainer from "../layout/buttonContainer.js";
import $inputItem from "../form/input-item.js";
import $form from "../form/form.js";
import $createRestaurantList from "./restaurantItemList.js";
import { UI_CONFIG } from "../../constants/uiConfig.js";
import { FORM_FIELDS } from "../../constants/formFields.js";
import { handleModalClose, handleModalOpen } from "../modal/modal.js";
import { validateRestaurantForm } from "../../validation/validationForm.js";
import { storageHandler } from "../../utils/storageHandler.js";
import { STORAGE_KEY_NAME } from "../../constants/storage.js";
import { CATEGORY_ICON } from "../../constants/iconPath.js";

const restaurantFormReset = () => {
  handleModalClose();
  const form = document.getElementById("add-restaurant-form");
  form.reset();
};

const addRestaurant = (data) => {
  const newRestaurant = {
    categoryIcon: CATEGORY_ICON[data.category],
    categoryTitle: data.category,
    name: data.name,
    distance: data.distance,
    description: data.description,
    link: data.link,
    id: new Date(),
    isFavorite: false,
  };

  const currentItem = storageHandler.getItem(STORAGE_KEY_NAME);
  storageHandler.setItem(STORAGE_KEY_NAME, [...currentItem, newRestaurant]);

  $createRestaurantList();
};

const handleAddRestaurant = (e) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    validateRestaurantForm(form);
    addRestaurant(data);
    restaurantFormReset(form);
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

const $createRestaurantForm = () => {
  const container = document.querySelector(".modal-container");
  container.replaceChildren();

  const cancelEvent = { eventType: "click", eventHandler: restaurantFormReset };
  const submitCancelButtons = $buttonContainer([
    $button(UI_CONFIG.BUTTONS.CANCEL, cancelEvent),
    $button(UI_CONFIG.BUTTONS.ADD),
  ]);

  const restaurantAddForm = [
    $inputItem(FORM_FIELDS.SELECTS, "category"),
    $inputItem(FORM_FIELDS.INPUTS, "name"),
    $inputItem(FORM_FIELDS.SELECTS, "distance"),
    $inputItem(FORM_FIELDS.TEXTAREAS, "description"),
    $inputItem(FORM_FIELDS.INPUTS, "link"),
    submitCancelButtons,
  ];

  const title = document.createElement("h2");
  title.classList.add("modal-title", "text-title");
  title.textContent = "새로운 음식점";

  container.appendChild(title);
  const submitForm = { eventType: "submit", eventHandler: handleAddRestaurant };
  container.appendChild($form(restaurantAddForm, submitForm));

  handleModalOpen();
};

export default $createRestaurantForm;
