import ModalContent from "./ModalContent";

class ModalRoot extends HTMLElement {
  #contentName: string | null;

  constructor() {
    super();

    this.#contentName = null;
    this.close = this.close.bind(this);
    this.onKeydownEscape = this.onKeydownEscape.bind(this);
  }

  connectedCallback() {
    this.renderContainer();
  }

  renderContainer() {
    this.innerHTML = `
      <div class="modal-backdrop"></div>
    `;
  }

  renderContent(contentName: string) {
    const content = document.createElement(contentName);

    if (!(content instanceof ModalContent)) return;

    this.appendChild(content);
    content.bindEvent(this.close);

    this.#contentName = contentName;
  }

  removeContent() {
    if (this.#contentName === null) return;

    const content = this.querySelector(this.#contentName);

    if (content === null) return;

    this.removeChild(content);
    this.#contentName = null;
  }

  bindEvent() {
    window.addEventListener("keydown", this.onKeydownEscape);

    this.querySelector(".modal-backdrop")?.addEventListener(
      "click",
      this.close
    );
  }

  removeEvent() {
    window.removeEventListener("keydown", this.onKeydownEscape);

    this.querySelector(".modal-backdrop")?.removeEventListener(
      "click",
      this.close
    );
  }

  open(contentName: string) {
    this.renderContent(contentName);
    this.classList.add("modal--open");
    this.bindEvent();
  }

  close() {
    this.removeContent();
    this.classList.remove("modal--open");
    this.removeEvent();
  }

  onKeydownEscape(event: KeyboardEvent) {
    if (event.code === "Escape") this.close();
  }
}

export default ModalRoot;
