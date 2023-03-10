class Modal {
  #target;

  constructor($target: Element) {
    this.#target = $target;
  }

  innerTemplate() {
    return ``;
  }

  template() {
    return `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
        ${this.innerTemplate()}
        </div>
      </div>
    `;
  }

  render() {
    this.#target.innerHTML = this.template();
    this.mounted();

    return this;
  }

  mounted() {
    return this;
  }
}

export default Modal;
