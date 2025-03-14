import { EVENT_TYPES } from "../../../constants/constants.js";
import "./bottomSheetBase.css";

export default class BottomSheetBase {
  constructor({ $children }) {
    this.$children = $children;
    this.$modal = document.createElement("div");
  }

  render() {
    this.$modal.className = "modal";

    const $backdrop = document.createElement("div");
    $backdrop.className = "modal-backdrop";

    const $container = document.createElement("div");
    $container.className = "modal-container";

    this.$modal.append($backdrop, $container);
    $container.append(this.$children);

    $backdrop.addEventListener(EVENT_TYPES.click, this.close.bind(this));

    return this.$modal;
  }

  open() {
    this.$modal.classList.add("modal--open");
  }

  close(e) {
    if (!e || !e.target.closest(".modal-container")) {
      this.$modal.classList.remove("modal--open");
    }
  }
}
