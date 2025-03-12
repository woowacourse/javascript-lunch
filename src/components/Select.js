function createSelect(fieldName) {
  const select = `<div class="form-item ${fieldName.required ? 'form-item--required' : ''}">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <select name="${fieldName.name}" id="${fieldName.name}">
      ${Array.from(fieldName.lists).map(([key, name]) => {
        return `<option value="${key}">${name}</option>`;
      })}
    </select>
  </div>`;

  return select;
}

export default createSelect;
