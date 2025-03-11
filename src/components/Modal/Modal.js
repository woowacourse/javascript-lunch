export default class Modal {
  constructor(modalElement, openButton, closeButton) {
    this.modalElement = modalElement;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.addEventListeners();
  }

  addEventListeners() {
    this.openButton.addEventListener("click", () => this.open());
    this.closeButton.addEventListener("click", () => this.close());

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
