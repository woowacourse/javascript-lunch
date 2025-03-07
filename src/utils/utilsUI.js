import Button from "../components/button.js";
import Store from "../components/store.js";
import querySelector from "./querySelector.js";
import validate from "./validate.js";
import createFormContent from "../components/formContent.js";
import optionInput from "../components/optionInput.js";
import options from "../constants/options.js";
import textInput from "../components/textInput.js";
import textArea from "../components/textArea.js";
import helpText from "../constants/helpText.js";

export const modalUtils = {
  closeModal: () => {
    const modal = querySelector(".modal");
    modal.classList.remove("modal--open");
  },

  addForm: () => {
    const modalContainer = querySelector(".modal-container");
    modalContainer.innerHTML = createFormContent({ title: "새로운 음식점" });

    const modalForm = querySelector(".modal-form");
    modalForm.appendChild(optionInput("category", options.category));
    modalForm.appendChild(textInput("name", true));
    modalForm.appendChild(optionInput("distance", options.distance));
    modalForm.appendChild(textArea("description", helpText.description));
    modalForm.appendChild(textInput("link", false, helpText.link));

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

    modalUtils.checkInput(nameInput, validate.nameLength);
    modalUtils.checkInput(descInput, validate.descLength);
    modalUtils.checkInput(linkInput, validate.linkForm);
  },

  checkInput: (input, validate) => {
    const addButton = querySelector("#add-button");

    input.addEventListener("input", (e) => {
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

export const storeUtils = {
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.classList.add("restaurant");
    const store = Store(storeProps);
    list.innerHTML = store;
    querySelector(".restaurant-list").appendChild(list);
  },

  updateStore: (storeList, e) => {
    try {
      e.preventDefault();

      const newStore = storeUtils.createStore(e);
      validate.nameLength(newStore.name);
      validate.descLength(newStore.description);
      validate.linkForm(newStore.link);

      storeList.updateList(newStore);
      storeUtils.addStore(newStore);

      modalUtils.closeModal();
    } catch (error) {
      alert(error.message);
    }
  },

  createStore: (e) => {
    return {
      category: e.target[0].value,
      name: e.target[1].value,
      dist: e.target[2].value,
      description: e.target[3].value,
      link: e.target[4].value,
    };
  },
};
