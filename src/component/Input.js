export function Input({ isRequired = false, name, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  function renderCaption() {
    return caption
      ? `<span class="help-text text-caption"
    >${caption}</span
  >`
      : "";
  }

  container.innerHTML = `
              <label for="link text-caption">${label}</label>
              <input type="text" name=${name} id=${name} />
             ${renderCaption()}
  `;

  return container;
}
