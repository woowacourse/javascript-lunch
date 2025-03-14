export function TextareaInput({ isRequired = false, name, label, caption }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
                <label for="description text-caption">${label}</label>
              <textarea
                name=${name}
                id="description"
                cols="30"
                rows="5"
                ${isRequired ? "required" : ""}
              ></textarea>
              <span class="help-text text-caption"
                >${caption}</span
              >
  `;

  return container;
}
