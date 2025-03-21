import { TextareaInputType } from "../../types/component/InputType";

export function TextareaInput({
  isRequired = false,
  label,
  caption,
  name,
}: TextareaInputType) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
                <label for=${name} text-caption">${label}</label>
              <textarea
                name=${name}
                id=${name}
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >${caption}</span
              >
  `;
  return container;
}
