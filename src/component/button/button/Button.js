export function Button({ name, type = "button", cssType = "primary", innerText, onClick = () => {} }) {
  const button = document.createElement("button");
  button.name = name;
  button.type = type;
  button.classList.add("button");
  button.classList.add(`button--${cssType}`);
  button.classList.add("text-caption");
  button.innerText = innerText;

  button.addEventListener("click", () => {
    onClick();
  });

  return button;
}
