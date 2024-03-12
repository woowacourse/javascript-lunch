import createElementByTag from "../../utils/createElementByTag";

class FormItem {
  element = createElementByTag({
    tag: "div",
    classes: ["form-item"],
  });
  #readableElement;

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

    const span = this.#createSpan(description);

    this.element.append(label, this.#readableElement, span);
  }

  getValue() {
    return this.#readableElement.value;
  }

  reset() {
    this.#readableElement.value = "";
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

  #createSpan(description: string) {
    const span = createElementByTag({
      tag: "span",
      classes: ["help-text", "text-caption"],
      contents: description,
    });
    return span;
  }
}

export default FormItem;
