function FormItem(label, formComponent) {
  const formItemElement = document.createElement("div");

  formItemElement.className = "form-item form-item--required";
  formItemElement.innerHTML = `<label for="category text-caption">${label}</label>`;
  formItemElement.appendChild(formComponent());
  return formItemElement;
}

export default FormItem;
