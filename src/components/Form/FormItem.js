function FormItem({ label, formComponent, notice = "" }) {
  const formItemElement = document.createElement("div");

  formItemElement.className = "form-item form-item--required";
  formItemElement.innerHTML = `<label for="category text-caption">${label}</label>`;
  formItemElement.appendChild(formComponent());

  if (notice) formItemElement.innerHTML += `<span class="help-text text-caption">${notice}</span>`;

  return formItemElement;
}

export default FormItem;
