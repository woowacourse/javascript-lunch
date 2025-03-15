import Button from "../components/Button.js";
import FormContent from "../components/FormContent.js";
import OptionInput from "../components/OptionInput.js";
import TextArea from "../components/TextArea.js";
import TextInput from "../components/TextInput.js";
import Restaurant from "../components/Restaurant.js";
import RESTAURANT_ADD_FORM_HELP_TEXT from "../constants/restaurantAddForm/helpText.js";
import RESTAURANT_ADD_FORM_SELECT_OPTIONS from "../constants/restaurantAddForm/selectOptions.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import { RestaurantItem } from "../types/restaurantItem.js";
import { restaurantHandler } from "./restaurantHandler.js";

export const modalHandler = {
  openModal: () => {
    const modal = querySelector(".modal");
    modal.classList.add("modal--open");
  },

  closeModal: () => {
    const modal = querySelector(".modal");
    const modalContainer = querySelector(".modal-container");
    modal.classList.toggle("modal--open");

    while (modalContainer.firstChild) {
      modalContainer.removeChild(modalContainer.firstChild);
    }
  },

  addRestaurantDetail: (restaurantDetail: RestaurantItem) => {
    const modalContainer = querySelector(".modal-container");
    const restaurantDetailItem = document.createElement("li");
    restaurantDetailItem.classList.add("restaurant", "restaurant__detail");
    restaurantDetailItem.innerHTML = Restaurant(restaurantDetail, true);

    restaurantDetailItem.appendChild(
      modalHandler.addButtons("delete", "close")
    );

    if (modalContainer.children.length === 0) {
      modalContainer.appendChild(restaurantDetailItem);
      modalHandler.openModal();
    }

    querySelector("#delete-button").addEventListener("click", () => {
      restaurantHandler.removeRestaurant(restaurantDetail.name);
      modalHandler.closeModal();
    });

    querySelector("#close-button").addEventListener("click", () => {
      modalHandler.closeModal();
    });
  },

  addForm: () => {
    const modalContainer = querySelector(".modal-container");
    modalContainer.innerHTML = FormContent({ title: "새로운 음식점" });

    const modalForm = querySelector(".modal-form");
    modalForm.appendChild(
      OptionInput("category", RESTAURANT_ADD_FORM_SELECT_OPTIONS.CATEGORY)
    );
    modalForm.appendChild(TextInput("name", true));
    modalForm.appendChild(
      OptionInput("distance", RESTAURANT_ADD_FORM_SELECT_OPTIONS.DISTANCE)
    );
    modalForm.appendChild(
      TextArea("description", RESTAURANT_ADD_FORM_HELP_TEXT.DESCRIPTION)
    );
    modalForm.appendChild(
      TextInput("link", false, RESTAURANT_ADD_FORM_HELP_TEXT.LINK)
    );

    modalForm.appendChild(modalHandler.addButtons("cancel", "add"));
    modalHandler.addFormCheck();

    querySelector("#cancel-button").addEventListener(
      "click",
      modalHandler.closeModal
    );
  },

  addButtons: (type1: string, type2: string) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(Button(type1));
    buttonContainer.appendChild(Button(type2));

    return buttonContainer;
  },

  addFormCheck: () => {
    const nameInput = querySelector("#name");
    const descInput = querySelector("#description");
    const linkInput = querySelector("#link");
    const categorySelect = querySelector("#category");
    const distSelect = querySelector("#distance");

    modalHandler.checkInput(nameInput, validate.nameLength);
    modalHandler.checkInput(descInput, validate.descLength);
    modalHandler.checkInput(linkInput, validate.linkForm);
    modalHandler.checkInput(categorySelect, validate.emptySelector, "change");
    modalHandler.checkInput(distSelect, validate.emptySelector, "change");
  },

  checkInput: (
    input: HTMLInputElement,
    validate: (value: string) => void,
    type: string = "input"
  ) => {
    const addButton = querySelector("#add-button");

    input.addEventListener(type, (e: Event) => {
      try {
        validate((e.target as HTMLInputElement).value);
        modalHandler.removeErrorText(input);
        addButton.classList.remove("disabled-button");
        addButton.disabled = false;
      } catch (error) {
        modalHandler.addErrorText(input, error as Error);
        addButton.classList.add("disabled-button");
        addButton.disabled = true;
      }
    });
  },

  addErrorText: (input: HTMLInputElement, e: Error) => {
    if (!input.classList.contains("form-item--error")) {
      input.classList.add("form-item--error");
      const parentNode = input.parentNode;
      const errorText = document.createElement("span");
      errorText.classList.add("error-text");
      errorText.innerText = e.message;
      parentNode?.appendChild(errorText);
    }
  },

  removeErrorText: (input: HTMLInputElement) => {
    const errorText = input.parentNode?.querySelector(".error-text");

    if (errorText) {
      input.classList.remove("form-item--error");
      input.parentNode?.removeChild(errorText);
    }
  },
};
