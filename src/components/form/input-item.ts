import { FieldGroup, FormField } from "../../types/formFieldsType";

const $inputItemLabel = ({ attribute, label }: FormField) => {
  const itemLabel = document.createElement("label");
  itemLabel.classList.add("text-caption");
  itemLabel.htmlFor = attribute.id;
  itemLabel.textContent = label;

  return itemLabel;
};

const $inputItemHelperText = (helperText: string) => {
  const itemHelperText = document.createElement("span");
  itemHelperText.classList.add("help-text", "text-caption");
  itemHelperText.textContent = helperText;

  return itemHelperText;
};

const $inputItem = (fieldType: FieldGroup, fieldName: string): HTMLElement => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("form-item");

  if (fieldType.fields[fieldName].attribute.required) {
    wrapper.classList.add("form-item--required");
  }

  wrapper.appendChild($inputItemLabel(fieldType.fields[fieldName]));
  wrapper.appendChild(fieldType.create(fieldType.fields[fieldName]));
  if (fieldType.fields[fieldName].helperText) {
    wrapper.appendChild(
      $inputItemHelperText(fieldType.fields[fieldName].helperText)
    );
  }

  return wrapper;
};

export default $inputItem;
