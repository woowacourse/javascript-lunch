import type { Props } from "../../types/type.ts";

interface InputBoxProps extends Props<"input"> {
  labelText: string;
  textCaption?: string;
}

export default function createInputBox({
  labelText,
  type,
  id,
  required = false,
  textCaption = "",
}: InputBoxProps) {
  const inputBox = createElement("div", {
    className: required ? ["form-item", "form-item--required"] : "form-item",
  });
  const inputLabel = createElement("label", {
    htmlFor: id,
    className: "text-caption",
    textContent: labelText,
  });
  const input = createElement("input", {
    type,
    name: id,
    id,
    required,
  });

  const fragment = createElementsFragment([inputLabel, input]);

  if (textCaption) {
    const textCaptionEl = createElement("span", {
      className: ["help-text", "text-caption"],
      textContent: textCaption,
    });

    fragment.appendChild(textCaptionEl);
  }

  inputBox.appendChild(fragment);
  return inputBox;
}
