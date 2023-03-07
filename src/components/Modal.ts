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
  }

  close() {
    const modalBg = $(".modal-backdrop");
    modalBg?.addEventListener("click", () => {
      if (!this.#isOpen) return;
      $(".modal")?.classList.remove("modal--open");
      this.#isOpen = false;
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        if (!this.#isOpen) return;
        $(".modal")?.classList.remove("modal--open");
        this.#isOpen = false;
      }
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
    mainSection?.appendChild(modalContainer);
    this.open();
    this.close();
  }
}

export default Modal;
