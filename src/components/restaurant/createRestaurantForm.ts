import $button from "../common/button";
import $buttonContainer from "../layout/buttonContainer";
import $inputItem from "../form/input-item";
import $form from "../form/form";
import $createRestaurantList from "./restaurantItemList";
import { UI_CONFIG } from "../../constants/uiConfig";
import { FORM_FIELDS } from "../../constants/formFields";
import { handleModalClose, handleModalOpen } from "../modal/modal.ts";
import { validateRestaurantForm } from "../../validation/validationForm";
import { storageHandler } from "../../utils/storageHandler";
import { STORAGE_KEY_NAME } from "../../constants/storage";
import { Category, FormEventType, IRestaurant } from "../../types/types";

const restaurantFormReset = () => {
  handleModalClose();
  const form = document.getElementById("add-restaurant-form");
  if (!(form instanceof HTMLFormElement)) return;
  form.reset();
};

const changeFilterSelect = (category: Category) => {
  const categorySelect = document.getElementById("category-filter");
  if (!(categorySelect instanceof HTMLSelectElement)) return;

  const sortSelect = document.getElementById("sorting-filter");
  if (!(sortSelect instanceof HTMLSelectElement)) return;

  if (categorySelect.value !== "") {
    categorySelect.value = category;
  }

  sortSelect.value = "";
};

const addRestaurant = ({
  category,
  name,
  distance,
  description,
  link,
}: IRestaurant) => {
  const newRestaurant = {
    category,
    name,
    distance,
    description,
    link,
    id: new Date(),
    isFavorite: false,
  };

  const currentItem = storageHandler.getItem(STORAGE_KEY_NAME);
  storageHandler.setItem(STORAGE_KEY_NAME, [...currentItem, newRestaurant]);

  $createRestaurantList();
};

const handleAddRestaurant = (e: Event) => {
  e.preventDefault();

  try {
    const form = document.getElementById("add-restaurant-form");
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as unknown as IRestaurant;

    validateRestaurantForm(form);
    changeFilterSelect(data.category);
    addRestaurant(data);
    restaurantFormReset();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

const $createRestaurantForm = () => {
  const container = document.querySelector(".modal-container");
  container?.replaceChildren();

  const cancelEvent = {
    eventType: "click",
    eventHandler: restaurantFormReset,
  };
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

  container?.appendChild(title);
  const submitForm = {
    eventType: "submit",
    eventHandler: handleAddRestaurant,
  };
  container?.appendChild($form(restaurantAddForm, submitForm));

  handleModalOpen();
};

export default $createRestaurantForm;
