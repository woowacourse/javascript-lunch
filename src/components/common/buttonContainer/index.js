const ButtonContainer = (buttons) => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  buttons.forEach((button) => buttonContainer.appendChild(button));

  return buttonContainer;
};
export default ButtonContainer;
