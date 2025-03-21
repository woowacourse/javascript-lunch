import { ButtonContainerType } from "../../types/component/ButtonType";

export function ButtonContainer({ buttons = [] }: ButtonContainerType) {
  const container = document.createElement("div");
  container.className = "button-container";
  buttons.forEach((button) => container.appendChild(button));

  return container;
}
