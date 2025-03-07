function FormItem({ label, formComponent, notice = "", required = false }) {
  const formItemElement = document.createElement("div");
  formItemElement.classList.add("form-item");

  if (required) {
    formItemElement.classList.add("form-item--required");
  }

  formItemElement.innerHTML = `<label for="category text-caption">${label}</label>`;
  formItemElement.appendChild(formComponent());

  if (notice) formItemElement.innerHTML += `<span class="help-text text-caption">${notice}</span>`;

  return formItemElement;
}

export default FormItem;
