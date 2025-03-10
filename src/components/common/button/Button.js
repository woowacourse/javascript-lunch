import "./button.css";

const actionVariant = {
  add: "primary",
  cancel: "secondary",
};

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
