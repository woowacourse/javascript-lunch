import { BUTTON_TYPES } from "../../../constants/constants.js";
import "./button.css";

const primaryActions = [BUTTON_TYPES.add, BUTTON_TYPES.close];
const secondaryActions = [BUTTON_TYPES.cancel, BUTTON_TYPES.delete];

const actionVariant = [...primaryActions, ...secondaryActions].reduce(
  (acc, action) => ({
    ...acc,
    [action]: primaryActions.includes(action) ? "primary" : "secondary",
  }),
  {}
);

export default class Button {
  constructor({ type = "button", text, action }) {
    this.type = type;
    this.text = text;
    this.action = action;
  }

  render() {
    const $button = document.createElement("button");

    $button.type = this.type;
    $button.textContent = this.text;
    $button.className = `button button--${
      actionVariant[this.action]
    } text-caption`;

    return $button;
  }
}
