import createElement from "../../util/createElement.js";

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

  document.body.appendChild($modal);

  $modal.appendChild($modalBackdrop);
  $modal.appendChild($modalContainer);
  $modalContainer.appendChild(component());
}
