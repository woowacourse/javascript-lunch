import { EVENT_TYPES } from "../../../constants/constants.js";
import "./bottomSheetBase.css";

export default class BottomSheetBase {
  constructor({ title, $children }) {
    this.title = title;
    this.$children = $children;
  }

  render() {
    const $modal = document.createElement("div");
    $modal.className = "modal";

    const $backdrop = document.createElement("div");
    $backdrop.className = "modal-backdrop";

    const $container = document.createElement("div");
    $container.className = "modal-container";

    const $title = document.createElement("h2");
    $title.className = "modal-title text-title";
    $title.textContent = this.title;

    const $form = document.createElement("form");

    $modal.appendChild($backdrop);
    $modal.appendChild($container);

    $container.appendChild($title);
    $container.appendChild($form);

    $form.appendChild(this.$children);

    $backdrop.addEventListener(EVENT_TYPES.click, (e) => {
      if (!e.target.closest(".modal-container")) {
        $modal.classList.remove("modal--open");
      }
    });

    return $modal;
  }
}
