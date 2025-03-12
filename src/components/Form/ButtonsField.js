import Button from "../Button.js";

function ButtonsField(buttonsProperty) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");

  buttonsProperty.forEach((buttonProperty) => {
    buttonContainerElement.appendChild(Button(buttonProperty));
  });

  return buttonContainerElement;
}

export default ButtonsField;
