import { $ } from "../util/querySelector";

class Modal {
  modalContents: string;

  #isOpen = false;

  constructor(modalContents: string) {
    this.modalContents = modalContents;
  }

  open() {
    if (this.#isOpen) return;

    $(".modal")?.classList.add("modal--open");
    this.#isOpen = true;
    $("body")?.classList.add("no-scroll");
  }

  close() {
    if (!this.#isOpen) return;

    $(".modal")?.classList.remove("modal--open");
    this.#isOpen = false;
    $("body")?.classList.remove("no-scroll");
  }

  handleCloseEvent() {
    const modalBg = $(".modal-backdrop");

    modalBg?.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });

    $(".close")?.addEventListener("click", () => {
      this.close();
    });
  }

  create() {
    return `
        <div class="modal">
            <div class="modal-backdrop"></div>
            <div class="modal-container">
            ${this.modalContents}
            </div>
        </div>
        `;
  }

  render() {
    const mainSection = $("main");
    const modalContainer = document.createElement("div");

    modalContainer.innerHTML = this.create();
    mainSection?.prepend(modalContainer);
    this.open();
    this.handleCloseEvent();
  }
}

export default Modal;
