import { FORM_FIELDS } from "../../constants/formFields";

type InputField = typeof FORM_FIELDS.INPUTS;
type SelectField = typeof FORM_FIELDS.SELECTS;
type TextAreaField = typeof FORM_FIELDS.TEXTAREAS;
type FieldType = InputField | SelectField | TextAreaField;
type FieldName = keyof FieldType;

const $inputItemLabel = ({ attribute, label }: FieldType) => {
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

const $inputItem = (fieldType: FieldType, fieldName: FieldName) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("form-item");
  if (fieldType[fieldName].attribute.required) {
    wrapper.classList.add("form-item--required");
  }

  wrapper.appendChild($inputItemLabel(fieldType[fieldName]));
  wrapper.appendChild(fieldType.create(fieldType[fieldName]));
  if (fieldType[fieldName].helperText) {
    wrapper.appendChild($inputItemHelperText(fieldType[fieldName].helperText));
  }

  return wrapper;
};

export default $inputItem;
