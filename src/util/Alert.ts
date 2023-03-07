import { $ } from "./querySelector";

class Alert {
  #isOpen;
  #targetElement;

  constructor(id: string) {
    this.#isOpen = false;
    this.#targetElement = $(`${id}`);
  }

  show(message: string) {
    if (this.#isOpen) return;

    this.#targetElement?.classList.remove("hidden");
    if (this.#targetElement) this.#targetElement.textContent = message;
    this.#isOpen = true;
  }

  hide() {
    if (!this.#isOpen) return;

    this.#targetElement?.classList.add("hidden");
    this.#isOpen = false;
  }
}

export default Alert;
