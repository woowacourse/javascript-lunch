import Button from "../components/Button.js";
import FormContent from "../components/FormContent.js";
import OptionInput from "../components/OptionInput.js";
import TextArea from "../components/TextArea.js";
import TextInput from "../components/TextInput.js";

import RESTAURANT_ADD_FORM_HELP_TEXT from "../constants/restaurantAddForm/helpText.js";
import RESTAURANT_ADD_FORM_SELECT_OPTIONS from "../constants/restaurantAddForm/selectOptions.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import { restaurantHandler } from "./restaurantHandler.js";

export const modalHandler = {
  closeModal: () => {
    const modal = querySelector(".modal");
    modal.classList.remove("modal--open");
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

    modalForm.appendChild(modalHandler.addButtons());
    modalHandler.addFormCheck();

    querySelector("#cancel-button").addEventListener(
      "click",
      modalHandler.closeModal
    );
  },

  addButtons: () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(Button("cancel"));
    buttonContainer.appendChild(Button("add"));

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

  checkInput: (input, validate, type = "input") => {
    const addButton = querySelector("#add-button");

    input.addEventListener(type, (e) => {
      try {
        validate(e.target.value);
        modalHandler.removeErrorText(input);
        addButton.classList.remove("disabled-button");
        addButton.disabled = false;
      } catch (e) {
        modalHandler.addErrorText(input, e);
        addButton.classList.add("disabled-button");
        addButton.disabled = true;
      }
    });
  },

  addErrorText: (input, e) => {
    if (!input.classList.contains("form-item--error")) {
      input.classList.add("form-item--error");
      const parentNode = input.parentNode;
      const errorText = document.createElement("span");
      errorText.classList.add("error-text");
      errorText.innerText = e.message;
      parentNode.appendChild(errorText);
    }
  },

  removeErrorText: (input) => {
    if (input.parentNode.querySelector(".error-text")) {
      input.classList.remove("form-item--error");
      input.parentNode.removeChild(
        input.parentNode.querySelector(".error-text")
      );
    }
  },
};
