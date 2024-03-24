import "../style.css";

import createElementByTag from "../../../utils/createElementByTag";

class TabBarItem {
  element;

  #isOn = false;

  #onFunction;

  #offFunction;

  get isOn() {
    return this.#isOn;
  }

  constructor({
    value,
    onFunction = () => {},
    offFunction = () => {},
    eventListenerArgs = [],
  }: {
    value: string;
    onFunction?: (...args: any[]) => any;
    offFunction?: (...args: any[]) => any;
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.element = createElementByTag({
      tag: "section",
      classes: ["tab-bar__item", "tab-bar__item--off"],
      contents: value,
    }) as HTMLElement;

    this.#onFunction = onFunction;
    this.#offFunction = offFunction;

    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });
  }

  on() {
    this.element.classList.remove("tab-bar__item--off");
    this.element.classList.add("tab-bar__item--on");
    this.#isOn = true;
    this.#onFunction();
  }
  off() {
    this.element.classList.remove("tab-bar__item--on");
    this.element.classList.add("tab-bar__item--off");
    this.#isOn = false;
    this.#offFunction();
  }
}

export default TabBarItem;
