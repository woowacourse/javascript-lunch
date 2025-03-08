const $button = ({ text, type, className, event }) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.type = type;
  button.classList.add(...className);

  if (event) {
    button.addEventListener("click", event);
  }

  return button;
};

export default $button;
