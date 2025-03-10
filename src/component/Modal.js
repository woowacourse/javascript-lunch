import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import toElement from "../utils/toElement.js";
import AddLunchModalForm from "./AddLunchModalForm.js";

class Modal {
  constructor(id, modalContent) {
    const $modal = toElement(`<div id="${id}" class="modal" />`);
    append($modal, this.createModalBackdrop(id));
    append($modal, this.createModalContainer(modalContent));

    return $modal;
  }

  createModalBackdrop(id) {
    const $modalBackdrop = toElement(`
      <div class="modal-backdrop" />
      `);
    $modalBackdrop.addEventListener("click", () => Modal.close(id));

    return $modalBackdrop;
  }

  createModalContainer(modalContent) {
    const $modalContainer = toElement(`
      <div class="modal-container"/>
      `);
    append($modalContainer, modalContent);

    return $modalContainer;
  }

  static open(id) {
    document.getElementById(id).classList.add("modal--open");

    this.keydownHandler = (e) => {
      if (e.key === "Escape") {
        this.close(id);
      }
    };

    document.addEventListener("keydown", this.keydownHandler, { once: true });
  }

  static close(id) {
    document.getElementById(id).classList.remove("modal--open");

    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
      this.keydownHandler = null;
    }
  }
}

export default Modal;
