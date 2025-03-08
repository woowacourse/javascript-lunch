const $inputItem = (fieldType, fieldName) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("form-item");
  if (fieldType[fieldName].attribute.required)
    wrapper.classList.add("form-item--required");

  const label = document.createElement("label");
  label.htmlFor = `${fieldType[fieldName].attribute.id} text-caption`;
  label.textContent = fieldType[fieldName].label;
  wrapper.appendChild(label);
  wrapper.appendChild(fieldType.create(fieldType[fieldName]));

  if (fieldType[fieldName].helperText) {
    const helperText = document.createElement("span");
    helperText.classList.add("help-text", "text-caption");
    helperText.textContent = fieldType[fieldName].helperText;
    wrapper.appendChild(helperText);
  }

  return wrapper;
};

export default $inputItem;
