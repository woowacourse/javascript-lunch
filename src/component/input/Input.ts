import { InputType } from "../../types/component/InputType";

function RenderCaption(caption: string) {
  return caption
    ? `<span class="help-text text-caption">${caption}</span>`
    : "";
}

export function Input({ isRequired = false, name, label, caption }: InputType) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
  <label for="link text-caption">${label}</label>
  <input type="text" name="${name}" id="${name}" />
  ${RenderCaption(caption)}
  `;

  return container;
}
