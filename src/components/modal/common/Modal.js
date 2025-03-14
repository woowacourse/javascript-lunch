class Modal {
  #$target;
  #isOpen = false;

  constructor($target) {
    this.#$target = $target;
    this.handleClose = this.close.bind(this);
  }

  contents() {
    return "";
  }

  #mount() {
    const $backdrop = this.#$target.querySelector(".modal-backdrop");
    if ($backdrop) {
      $backdrop.removeEventListener("click", this.handleClose);
      $backdrop.addEventListener("click", this.handleClose);
    }
  }

  #template() {
    if (!this.#isOpen) return "";
    return /* html */ `
      <div class="modal" data-testid="modal">
        <div class="modal-backdrop" data-testid="modal-backdrop"></div>
        <div id="modal-container" class="modal-container">
          ${this.contents()}
        </div>
      </div>
    `;
  }

  open() {
    if (!this.#isOpen) {
      this.#isOpen = true;
      this.#$target.insertAdjacentHTML("beforeend", this.#template());
      this.#mount();
    }
  }

  close() {
    if (this.#isOpen) {
      this.#isOpen = false;
      this.#$target.replaceChildren();
    }
  }

  getIsOpen() {
    return this.#isOpen;
  }

  getTarget() {
    return this.#$target;
  }
}

export default Modal;
