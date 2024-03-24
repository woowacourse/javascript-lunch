import "./style.css";

import createElementByTag from "../../utils/createElementByTag";

interface modalConstructorProps {
  contents?: HTMLElement[];
  eventListenerArgs?: EventListenerArg[];
  openFunc?: any;
  closeFunc?: any;
}

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

  #openFunc = () => {};

  #closeFunc = () => {};

  constructor(options?: modalConstructorProps) {
    this.element.append(this.#backDrop, this.#container);

    this.#setDefaultEvent();

    if (!options) return;

    const { contents, eventListenerArgs, openFunc, closeFunc } = options;
    if (contents) this.#container.append(...contents);

    if (eventListenerArgs)
      eventListenerArgs.forEach((args) => {
        this.element.addEventListener(...args);
      });

    if (openFunc) this.#openFunc = openFunc;
    if (closeFunc) this.#closeFunc = closeFunc;
  }

  close() {
    this.element.classList.remove("modal--open");
    this.#closeFunc();
  }

  open() {
    this.element.classList.add("modal--open");
    this.#openFunc();
  }

  replaceContents(...children: HTMLElement[]) {
    this.#container.replaceChildren(...children);
  }

  #setDefaultEvent() {
    this.#backDrop.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.close();
    });
  }
}

export default Modal;
