export function SelectInput({ isRequired = false, label, optionList = [] }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }
  container.innerHTML = `         
           <label for="category text-caption">${label}</label>
            <select name="category" id="category" required>
            <option value="">선택해 주세요</option>
            ${optionList.forEach((optionItem) => {
              return `<option value="${optionItem}">${optionItem}</option>`;
            })}
            </select>
    `;

  return container;
}
