export function Button({ name, cssType, innerText, onClick = () => {} }) {
  const button = document.createElement("button");
  button.name = name;
  button.type = "button";
  button.classList.add("button");
  button.classList.add(`button--${cssType}`);
  button.classList.add("text-caption");
  button.innerText = innerText;

  button.addEventListener("click", () => {
    onClick();
  });

  return button;
}
