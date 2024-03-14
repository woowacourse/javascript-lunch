import "./style.css";

import FORM_ITEM_TEXTS from "../../../constants/formItemTexts";
import createElementByTag from "../../utils/createElementByTag";
import { error } from "console";

class FormItem {
  element = createElementByTag({
    tag: "div",
    classes: ["form-item"],
  });
  #readableElement: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

  #span;

  #description;

  constructor({
    subject,
    readableElement,
    isRequired = false,
    description = "ㅤ",
  }: {
    subject: string;
    readableElement: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
    isRequired?: boolean;
    description?: string;
  }) {
    if (isRequired) this.element.classList.add("form-item--required");
    this.element = this.#createElement(isRequired);
    const label = this.#createLabel(subject, readableElement.id);

    this.#readableElement = readableElement;
    if (isRequired) this.#setReadableElementToRequire();

    this.#description = description;
    this.#span = this.#createSpan();

    this.element.append(label, this.#readableElement, this.#span);
  }

  getValue() {
    return this.#readableElement.value;
  }

  reset() {
    this.#readableElement.value = "";
    this.removeErrorPrint();
  }

  removeErrorPrint() {
    this.#span.classList.remove("form-item-error-span");
    this.#span.textContent = this.#description;

    this.#readableElement.classList.remove("form-item-invalid-input");
  }

  renderErrorMessage(errorMessage: string) {
    this.#span.classList.add("form-item-error-span");
    this.#readableElement.classList.add("form-item-invalid-input");
    this.#span.textContent = errorMessage;
  }

  #createElement(isRequired: boolean) {
    return createElementByTag({
      tag: "div",
      classes: isRequired
        ? ["form-item", "form-item--required"]
        : ["form-item"],
    });
  }

  #createLabel(subject: string, readableElementId: string) {
    const label = document.createElement("label");
    label.htmlFor = `${readableElementId} text-caption`;
    label.textContent = subject;

    return label;
  }

  #createSpan() {
    const span = createElementByTag({
      tag: "span",
      classes: ["help-text", "text-caption"],
      contents: this.#description,
    });
    return span;
  }

  #setReadableElementToRequire() {
    this.#readableElement.required = true;
    this.#readableElement.addEventListener("invalid", (event) => {
      event.preventDefault();
      this.renderErrorMessage(FORM_ITEM_TEXTS.requireItem);
    });
  }
}

export default FormItem;
