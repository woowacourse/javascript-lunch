import "./style.css";

import createElementByTag from "../../utils/createElementByTag";

class Modal {
  element: HTMLElement = createElementByTag({
    tag: "aside",
    classes: ["modal"],
  });

  #backDrop: HTMLElement = createElementByTag({
    tag: "div",
    classes: ["modal-backdrop"],
  });

  #container = createElementByTag({
    tag: "section",
    classes: ["modal-container"],
  });

  constructor({
    contents = [],
    eventListenerArgs = [],
  }: {
    contents?: HTMLElement[];
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.#container.append(...contents);
    this.element.append(this.#backDrop, this.#container);

    this.#setDefaultEvent();

    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });
  }

  close() {
    this.element.classList.remove("modal--open");
  }

  open() {
    this.element.classList.add("modal--open");
  }

  replaceContents(children: HTMLElement[]) {
    this.#container.replaceChildren(...children);
  }

  #setDefaultEvent() {
    this.#backDrop.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Modal;
