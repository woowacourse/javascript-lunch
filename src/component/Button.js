export function Button({ cssType, innerText }) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("button");
  button.classList.add(`button--${cssType}`);
  button.classList.add("text-caption");
  button.innerText = innerText;

  return button;
}
