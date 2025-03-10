import Button from "../components/Button.js";
import FormContent from "../components/FormContent.js";
import OptionInput from "../components/OptionInput.js";
import Restaurant from "../components/Restaurant.js";
import TextInput from "../components/TextInput.js";
import TextArea from "../components/TextArea.js";

import helpText from "../constants/helpText.js";
import selectOptions from "../constants/selectOptions.js";
import querySelector from "./querySelector.js";
import validate from "./validate.js";

export const modalUtils = {
  closeModal: () => {
    const modal = querySelector(".modal");
    modal.classList.remove("modal--open");
  },

  addForm: () => {
    const modalContainer = querySelector(".modal-container");
    modalContainer.innerHTML = FormContent({ title: "새로운 음식점" });

    const modalForm = querySelector(".modal-form");
    modalForm.appendChild(OptionInput("category", selectOptions.CATEGORY));
    modalForm.appendChild(TextInput("name", true));
    modalForm.appendChild(OptionInput("distance", selectOptions.DISTANCE));
    modalForm.appendChild(TextArea("description", helpText.DESCRIPTION));
    modalForm.appendChild(TextInput("link", false, helpText.LINK));

    modalForm.appendChild(modalUtils.addButtons());
    modalUtils.addFormCheck();

    querySelector("#cancel-button").addEventListener(
      "click",
      modalUtils.closeModal
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

    modalUtils.checkInput(nameInput, validate.nameLength);
    modalUtils.checkInput(descInput, validate.descLength);
    modalUtils.checkInput(linkInput, validate.linkForm);
    modalUtils.checkInput(categorySelect, validate.emptySelector, "change");
    modalUtils.checkInput(distSelect, validate.emptySelector, "change");
  },

  checkInput: (input, validate, type = "input") => {
    const addButton = querySelector("#add-button");

    input.addEventListener(type, (e) => {
      try {
        validate(e.target.value);
        modalUtils.removeErrorText(input);
        addButton.classList.remove("disabled-button");
        addButton.disabled = false;
      } catch (e) {
        modalUtils.addErrorText(input, e);
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

export const restaurantUtils = {
  addRestaurant: (restaurantProps) => {
    const list = document.createElement("li");
    list.classList.add("restaurant");
    const restaurant = Restaurant(restaurantProps);
    list.innerHTML = restaurant;
    querySelector(".restaurant-list").appendChild(list);
  },

  updateRestaurant: (restaurantList, e) => {
    const newRestaurant = restaurantUtils.createRestaurant(e);

    try {
      e.preventDefault();

      validate.emptySelector(newRestaurant.category);
      validate.nameLength(newRestaurant.name);
      validate.emptySelector(newRestaurant.dist);
      validate.descLength(newRestaurant.description);
      validate.linkForm(newRestaurant.link);

      restaurantList.updateList(newRestaurant);
      restaurantUtils.addRestaurant(newRestaurant);

      modalUtils.closeModal();
    } catch (error) {
      restaurantUtils.checkRequired("category", newRestaurant.category, error);
      restaurantUtils.checkRequired("name", newRestaurant.name, error);
      restaurantUtils.checkRequired("distance", newRestaurant.dist, error);
    }
  },

  checkRequired: (input, value, error) => {
    if (value === "") {
      const input = querySelector(`#${input}`);
      modalUtils.addErrorText(input, error);
    }
  },

  createRestaurant: (e) => {
    return {
      category: e.target[0].value,
      name: e.target[1].value,
      dist: e.target[2].value,
      description: e.target[3].value,
      link: e.target[4].value,
    };
  },
};
