import "./style.css";

import FILLED_ICON from "./Icons/favorite-icon-filled.png";
import LINED_ICON from "./Icons/favorite-icon-lined.png";
import createElementByTag from "../../utils/createElementByTag";

class FavoriteToggler {
  element = this.#createElement() as HTMLButtonElement;

  #onImage = this.#createOnImage();

  #offImage = this.#createOffImage();

  #toggleAction;

  #isOn: boolean;

  constructor({
    isOn = false,
    toggleAction: toggleAction = () => {},
    eventListenerArgs = [],
  }: {
    isOn: boolean;
    toggleAction?: () => any;
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.#isOn = isOn;
    if (this.#isOn) this.on();
    else this.off();
    this.#toggleAction = toggleAction;

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
    if (this.#isOn) this.off();
    else this.on();
    this.#isOn = !this.#isOn;
    this.#toggleAction();
  }

  isOn() {
    return this.#isOn;
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
