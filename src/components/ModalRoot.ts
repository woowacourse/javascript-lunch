class ModalRoot extends HTMLElement {
  #contentId: string | null;

  constructor() {
    super();

    this.#contentId = null;
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

  renderContent(content: string, contentId: string) {
    this.insertAdjacentHTML("beforeend", content);
    this.#contentId = contentId;
  }

  removeContent() {
    if (this.#contentId === null) return;

    const content = this.querySelector(this.#contentId);

    if (content === null) return;

    this.removeChild(content);
    this.#contentId = null;
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

  open(content: string, contentId: string) {
    this.renderContent(content, contentId);
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
