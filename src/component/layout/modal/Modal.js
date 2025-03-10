export default class Modal {
  #isOpen = false;
  constructor({ title, content }) {
    this.title = title;
    this.content = content;
    this.container = document.createElement("div");
    this.container.classList.add("modal");
    this.container.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">${title}</h2>
      </div>
      
`;
    document.querySelector("body").appendChild(this.container);

    this.container.querySelector(".modal-container").appendChild(this.content);
    this.container
      .querySelector(".modal-backdrop")
      .addEventListener("click", () => this.close());

    this.close();
  }
  open() {
    this.#isOpen = true;
    this.container.classList.add("modal--open");
  }
  close() {
    this.#isOpen = false;
    this.container.classList.remove("modal--open");
  }
  get isOpen() {
    return this.#isOpen;
  }
}
