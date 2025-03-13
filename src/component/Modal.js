import append from "../utils/append.js";
import toElement from "../utils/toElement.js";

function Modal(id, modalContent) {
  function createModalBackdrop(id) {
    const $modalBackdrop = toElement(`
      <div class="modal-backdrop" />
    `);
    $modalBackdrop.addEventListener("click", () => Modal.close(id));

    return $modalBackdrop;
  }

  function createModalContainer(modalContent) {
    const $modalContainer = toElement(`
      <div class="modal-container"/>
    `);
    append($modalContainer, modalContent);

    return $modalContainer;
  }

  const $modal = toElement(`<div id="${id}" class="modal" />`);
  append($modal, createModalBackdrop(id), createModalContainer(modalContent));

  return $modal;
}

Modal.open = function (id) {
  document.getElementById(id).classList.add("modal--open");

  Modal.keydownHandler = (e) => {
    if (e.key === "Escape") {
      Modal.close(id);
    }
  };

  document.addEventListener("keydown", Modal.keydownHandler, { once: true });
};

Modal.close = function (id) {
  document.getElementById(id).classList.remove("modal--open");

  if (Modal.keydownHandler) {
    document.removeEventListener("keydown", Modal.keydownHandler);
    Modal.keydownHandler = null;
  }
};

export default Modal;
