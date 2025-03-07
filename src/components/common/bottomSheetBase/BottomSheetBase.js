import { EVENT_TYPES } from "../../../constants/constants.js";
import "./bottomSheetBase.css";

export default class BottomSheetBase {
  constructor({ title, $children }) {
    this.title = title;
    this.$children = $children;
    this.$modal = document.createElement("div");
  }

  render() {
    this.$modal.className = "modal";

    const $backdrop = document.createElement("div");
    $backdrop.className = "modal-backdrop";

    const $container = document.createElement("div");
    $container.className = "modal-container";

    const $title = document.createElement("h2");
    $title.className = "modal-title text-title";
    $title.textContent = this.title;

    this.$modal.appendChild($backdrop);
    this.$modal.appendChild($container);

    $container.appendChild($title);
    $container.appendChild(this.$children);

    $backdrop.addEventListener(
      EVENT_TYPES.click,
      this.#handleBackdropClick.bind(this)
    );

    return this.$modal;
  }

  #handleBackdropClick(e) {
    if (!e.target.closest(".modal-container")) {
      this.$modal.classList.remove("modal--open");
    }
  }
}
