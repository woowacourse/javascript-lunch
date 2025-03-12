import "./Modal.css";
import createCategory from "./Select/CategorySelect.js";
import createName from "./Select/NameLink.js";
import createDistance from "./Select/DistanceSelect.js";
import createDescription from "./Select/DescriptionLink.js";
import createLink from "./Select/LinkInput.js";
import modalButton from "./Button/Button.js";

export default class Modal {
  constructor(modalElement, openButton) {
    this.modalElement = modalElement;
    this.openButton = openButton;
    this.formElement = this.modalElement.querySelector("form");

    this.addFormFields();
    this.closeButton = this.modalElement.querySelector("#cancel-dialog-btn");
    this.addEventListeners();
  }

  addFormFields() {
    createCategory();
    createName();
    createDistance();
    createDescription();
    createLink();
    modalButton();
  }

  addEventListeners() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());

    const formElement = document.querySelector("#add-restaurant-dialog form");
    this.closeButton.addEventListener("click", () => {
      formElement.reset();
    });

    this.modalElement.addEventListener("click", (event) => {
      if (!event.target.closest(".modal-container")) {
        this.close();
      }
    });
  }

  open() {
    this.modalElement.showModal();
  }

  close() {
    this.modalElement.close();
  }
}
