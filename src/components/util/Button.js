import createElement from "../../util/createElement.js";

export default function Button({ variant, type, text, onClick }) {
  const $button = createElement({
    tag: "button",
    classNames: ["button", `button--${variant}`, "text-caption"],
    type,
  });
  $button.textContent = text;
  $button.onclick = onClick;

  return $button;
}
