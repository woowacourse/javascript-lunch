import createElement from "../util/createElement.js";

export default function Modal(component) {
  const $body = document.querySelector("body");

  const $modal = createElement({ tag: "div", classNames: ["modal"] });
  const $modalBackdrop = createElement({
    tag: "div",
    classNames: ["modal-backdrop"],
  });
  const $modalContainer = createElement({
    tag: "div",
    classNames: ["modal-container"],
  });

  $body.appendChild($modal);

  $modal.appendChild($modalBackdrop);
  $modal.appendChild($modalContainer);
  $modalContainer.appendChild(component());
}
