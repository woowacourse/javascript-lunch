export function Input({ isRequired = false, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
              <label for="link text-caption">${label}</label>
              <input type="text" name="link" id="link" />
              <span class="help-text text-caption"
                >${caption}</span
              >
  `;

  return container;
}
