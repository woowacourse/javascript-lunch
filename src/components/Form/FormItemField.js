function FormItemField({ item, component }) {
  const formItemElement = document.createElement("div");
  const labelElement = document.createElement("label");

  formItemElement.classList.add("form-item");

  if (item.required) {
    formItemElement.classList.add("form-item--required");
  }

  labelElement.setAttribute("for", item.name);
  labelElement.textContent = item.label;
  formItemElement.appendChild(labelElement);

  formItemElement.appendChild(component);

  if (item.notice) formItemElement.innerHTML += `<span class="help-text text-caption">${item.notice}</span>`;

  return formItemElement;
}

export default FormItemField;
