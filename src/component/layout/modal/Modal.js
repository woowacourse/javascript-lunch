export default class Modal {
  #isOpen = false;
  #content;
  #container;

  constructor({ content }) {
    this.#content = content;
    this.#container = document.createElement("div");
    this.#container.classList.add("modal");
    this.#container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
      </div>
      
`;

    this.#container.querySelector(".modal-container").appendChild(this.#content);
    this.#container.querySelector(".modal-backdrop").addEventListener("click", () => this.close());

    this.close();
  }
  open() {
    this.#isOpen = true;
    this.#container.classList.add("modal--open");
  }
  close() {
    this.#isOpen = false;
    this.#container.classList.remove("modal--open");
  }
  get isOpen() {
    return this.#isOpen;
  }
  get element() {
    return this.#container;
  }
}
