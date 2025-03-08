import createElement from "../../util/createElement.js";
import { $ } from "../../util/querySelector.js";

export default function Modal(component) {
  const $modal = createElement({
    tag: "div",
    classNames: ["modal", "modal--open"],
  });
  const $modalBackdrop = createElement({
    tag: "div",
    classNames: ["modal-backdrop"],
  });
  const $modalContainer = createElement({
    tag: "div",
    classNames: ["modal-container"],
  });

  $modalBackdrop.addEventListener("click", () => {
    removeModal();
  });
  document.addEventListener("keydown", handleEscKeyDown);

  document.body.appendChild($modal);

  $modal.appendChild($modalBackdrop);
  $modal.appendChild($modalContainer);
  $modalContainer.appendChild(component());
}

function handleEscKeyDown(event) {
  if (event.key === "Escape") {
    removeModal();
  }
}

function removeModal() {
  $(".modal").remove();
  document.removeEventListener("keydown", handleEscKeyDown);
}
