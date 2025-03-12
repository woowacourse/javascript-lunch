function Button({ type, stylingBased, text }) {
  const buttonElement = document.createElement("button");
  buttonElement.type = type;
  buttonElement.innerText = text;
  buttonElement.className = `button button--${stylingBased} text-caption`;

  return buttonElement;
}

export default Button;
