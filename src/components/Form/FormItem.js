function FormItem({ label, name, fieldComponent, notice = "", required = false }) {
  const formItemElement = document.createElement("div");
  formItemElement.classList.add("form-item");

  if (required) {
    formItemElement.classList.add("form-item--required");
  }

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", name);
  labelElement.textContent = label;
  formItemElement.appendChild(labelElement);

  formItemElement.appendChild(fieldComponent);

  if (notice) {
    const noticeElement = document.createElement("span");
    noticeElement.classList.add("help-text");
    noticeElement.textContent = notice;
    formItemElement.appendChild(noticeElement);
  }

  return formItemElement;
}

export default FormItem;
