import createElement from "../../util/createElement.js";

export default function Button({ variant, type, text, onClick, className }) {
  const $button = createElement({
    tag: "button",
    classNames: ["button", `button--${variant}`, "text-caption", className],
    type,
    textContent: text,
    onClick,
  });

  return $button;
}
