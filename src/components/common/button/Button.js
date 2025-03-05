import "./button.css";

const actionVariant = {
  add: "primary",
  cancel: "secondary",
};

export default function Button({ type = "button", text, action }) {
  const $button = document.createElement("button");

  $button.type = type;
  $button.textContent = text;
  $button.className = `button button--${actionVariant[action]} text-caption`;

  return $button;
}
