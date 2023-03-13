class Modal {
  #target;

  constructor($target: Element) {
    this.#target = $target;
  }

  innerTemplate(value?: object) {
    return ``;
  }

  template(value?: object) {
    return `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
        ${this.innerTemplate(value)}
        </div>
      </div>
    `;
  }

  render(value?: object) {
    this.#target.innerHTML = this.template(value);
    this.mounted();

    return this;
  }

  mounted() {
    return this;
  }
}

export default Modal;
