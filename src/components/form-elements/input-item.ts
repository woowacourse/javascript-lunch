import { FieldGroup } from "../../constants/formFields.ts";

const $inputItem = (fieldGroup: FieldGroup, fieldName: string): HTMLElement => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("form-item");

  const field = fieldGroup.fields[fieldName];

  if (field.attribute.required) {
    wrapper.classList.add("form-item--required");
  }

  const label = document.createElement("label");
  label.htmlFor = `${field.attribute.id} text-caption`;
  label.innerText = field.label;
  wrapper.appendChild(label);

  wrapper.appendChild(fieldGroup.create(field));

  if (field.helperText) {
    const helperText = document.createElement("span");
    helperText.classList.add("help-text", "text-caption");
    helperText.innerText = field.helperText;
    wrapper.appendChild(helperText);
  }

  return wrapper;
};

export default $inputItem;
