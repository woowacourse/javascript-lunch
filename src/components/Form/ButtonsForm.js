import Button from "../Button.js";

function ButtonsForm(buttonsProperty) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");

  buttonsProperty.forEach((buttonProperty) => {
    buttonContainerElement.appendChild(Button(buttonProperty));
  });

  return buttonContainerElement;
}

export default ButtonsForm;
