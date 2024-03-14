import "./style.css";

import createElementByTag from "../../utils/createElementByTag";
import { error } from "console";

class FormItem {
  element = createElementByTag({
    tag: "div",
    classes: ["form-item"],
  });
  #readableElement;

  #span;

  #spanDescription;

  constructor({
    subject,
    readableElement,
    isRequired = false,
    description = "",
  }: {
    subject: string;
    readableElement: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
    isRequired?: boolean;
    description?: string;
  }) {
    if (isRequired) this.element.classList.add("form-item--required");
    this.element = this.#createItem(isRequired);
    const label = this.#createLabel(subject, readableElement.id);

    this.#readableElement = readableElement;
    this.#readableElement.required = isRequired;

    this.#spanDescription = description;

    this.#span = this.#createSpan();

    this.element.append(label, this.#readableElement, this.#span);
  }

  getValue() {
    return this.#readableElement.value;
  }

  reset() {
    this.#readableElement.value = "";
    this.#span.classList.remove(".form-item-error-span");
  }

  printErrorMessage(errorMessage: string) {
    this.#span.nodeValue = errorMessage;
    this.#span.classList.add(".form-item-error-span");
  }

  #createItem(isRequired: boolean) {
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
      contents: this.#spanDescription,
    });
    return span;
  }
}

export default FormItem;
