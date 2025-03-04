export default function Button({ type = "button", text, action }) {
  const $button = document.createElement("button");

  $button.type = type;
  $button.textContent = text;
  $button.className = `button button--${
    action === "add" ? "primary" : "secondary"
  } text-caption`;

  return $button;
}
