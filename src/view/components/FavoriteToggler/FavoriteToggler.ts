import "./style.css";

import FILLED_ICON from "./Icons/favorite-icon-filled.png";
import LINED_ICON from "./Icons/favorite-icon-lined.png";
import createElementByTag from "../../utils/createElementByTag";

class FavoriteToggler {
  element = this.#createElement();

  #onImage = this.#createOnImage();

  #offImage = this.#createOffImage();

  #isOn: boolean;

  get isOn() {
    return this.#isOn;
  }

  set isOn(boolean: boolean) {
    this.#isOn = boolean;
    if (this.#isOn) this.on();
    else this.off();
  }

  constructor({
    isOn = false,
    eventListenerArgs = [],
  }: {
    isOn: boolean;
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.#isOn = isOn;
    this.isOn = this.#isOn;

    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });
  }

  on() {
    this.element.replaceChildren(this.#onImage);
  }

  off() {
    this.element.replaceChildren(this.#offImage);
  }

  toggle() {
    if (this.element.children[0] === this.#offImage) this.on();
    else this.off();
    this.isOn = !this.isOn;
  }

  #createElement() {
    const element = createElementByTag({
      tag: "button",
      classes: ["favorite-button"],
    });
    element.addEventListener("click", () => {
      this.toggle();
    });

    return element;
  }

  #createOnImage() {
    const onImage = createElementByTag({ tag: "img" }) as HTMLImageElement;
    onImage.src = FILLED_ICON;
    return onImage;
  }

  #createOffImage() {
    const offImage = createElementByTag({ tag: "img" }) as HTMLImageElement;
    offImage.src = LINED_ICON;
    return offImage;
  }
}

export default FavoriteToggler;
