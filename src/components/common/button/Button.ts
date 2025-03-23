import { ButtonType, UIComponent } from "../../../../types";
import { BUTTON_TYPES } from "../../../constants";
import "./button.css";

const primaryActions: ButtonType[] = [BUTTON_TYPES.add, BUTTON_TYPES.close];
const secondaryActions: ButtonType[] = [
  BUTTON_TYPES.cancel,
  BUTTON_TYPES.delete,
];

const actionVariant = [...primaryActions, ...secondaryActions].reduce(
  (acc, action) => ({
    ...acc,
    [action]: primaryActions.includes(action) ? "primary" : "secondary",
  }),
  {} as Record<ButtonType, "primary" | "secondary">
);

interface ButtonProps {
  type?: "button" | "submit";
  text: string;
  action: ButtonType;
}

export default class Button implements UIComponent {
  private type: ButtonProps["type"];
  private text: ButtonProps["text"];
  private action: ButtonProps["action"];

  constructor({ type = "button", text, action }: ButtonProps) {
    this.type = type;
    this.text = text;
    this.action = action;
  }

  render(): HTMLButtonElement {
    const $button = document.createElement("button");

    if (this.type) $button.type = this.type;
    $button.textContent = this.text;
    $button.className = `button button--${
      actionVariant[this.action]
    } text-caption`;

    return $button;
  }
}
