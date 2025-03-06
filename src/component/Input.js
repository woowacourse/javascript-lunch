function renderCaption(caption) {
  return caption
    ? `<span class="help-text text-caption"
  >${caption}</span
>`
    : "";
}

export function Input({
  isRequired = false,
  name,
  label,
  caption,
  isError = false,
}) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
              <label for="link text-caption">${label}</label>
              <input type="text" name=${name} id=${name} />
             ${renderCaption(caption)}
  `;

  return container;
}
