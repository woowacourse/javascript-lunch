function createSelect(fieldName) {
  const select = `<div class="form-item ${fieldName.required ? 'form-item--required' : ''}">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <select name="${fieldName.name}" id="${fieldName.name}">
      <option value="">${fieldName.default}</option>
      ${Array.from(fieldName.lists.values()).map((list) => {
        return `<option value="${list}">${list}</option>`;
      })}
    </select>
  </div>`;

  return select;
}

export default createSelect;
