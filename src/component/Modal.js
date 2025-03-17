import append from "../utils/append.js";
import toElement from "../utils/toElement.js";

function Modal(id, modalContent) {
  function createModalBackdrop(id) {
    const $el = toElement(`
      <div class="modal-backdrop" />
    `);
    $el.addEventListener("click", () => Modal.close(id));

    return $el;
  }

  function createModalContainer(modalContent) {
    const $el = toElement(`
      <div class="modal-container"/>
    `);
    append($el, modalContent);

    return $el;
  }

  const $el = toElement(`<div id="${id}" class="modal" />`);
  append($el, createModalBackdrop(id), createModalContainer(modalContent));

  return $el;
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
