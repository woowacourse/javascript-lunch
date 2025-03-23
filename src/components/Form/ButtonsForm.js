function ButtonsForm(buttonItems) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");

  buttonItems.forEach((buttonItem) => {
    buttonContainerElement.appendChild(buttonItem);
  });

  return buttonContainerElement;
}

export default ButtonsForm;
