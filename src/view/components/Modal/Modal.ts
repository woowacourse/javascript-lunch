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

  #openFunc;

  #closeFunc;

  constructor({
    contents = [],
    eventListenerArgs = [],
    openFunc = () => {},
    closeFunc = () => {},
  }: {
    contents?: HTMLElement[];
    eventListenerArgs?: EventListenerArg[];
    openFunc?: any;
    closeFunc?: any;
  }) {
    this.#container.append(...contents);
    this.element.append(this.#backDrop, this.#container);

    this.#setDefaultEvent();

    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });

    this.#openFunc = openFunc;
    this.#closeFunc = closeFunc;
  }

  close() {
    this.element.classList.remove("modal--open");
    this.#closeFunc();
  }

  open() {
    this.element.classList.add("modal--open");
    this.#openFunc();
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
