class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.renderContainer();
    this.bindEvent();
  }

  renderContainer() {
    this.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    `;
  }

  renderContent(content: string) {
    const modalContainer = this.querySelector(".modal-container");

    if (!(modalContainer instanceof HTMLElement)) return;

    modalContainer.innerHTML = content;
  }

  bindEvent() {
    this.querySelector(".modal-backdrop")?.addEventListener(
      "click",
      this.close.bind(this)
    );
  }

  open(content: string) {
    this.classList.add("modal--open");
    this.renderContent(content);
  }

  close() {
    this.classList.remove("modal--open");
    this.renderContent("");
  }
}

export default Modal;
