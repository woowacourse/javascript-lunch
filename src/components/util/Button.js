import createElement from "../../util/createElement.js";

export default function Button({ variant, type, text }) {
  const $button = createElement({
    tag: "button",
    classNames: ["button", `button--${variant}`, "text-caption"],
    type,
  });
  $button.textContent = text;

  return $button;
}
