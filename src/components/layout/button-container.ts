type ButtonContainerProps = {
  buttons: HTMLButtonElement[];
};

const $buttonContainer = ({
  buttons = [],
}: ButtonContainerProps): HTMLDivElement => {
  const container = document.createElement("div");
  container.classList.add("button-container");

  buttons.forEach((button) => {
    container.appendChild(button);
  });

  return container;
};

export default $buttonContainer;
