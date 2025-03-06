import $button from "./button";

const $buttonContainer = (buttons) => {
  const container = document.createElement("div");
  container.classList.add("button-container");

  buttons.forEach((button) => {
    container.appendChild(button);
  });

  return container;
}

export default $buttonContainer;