function createInput(fieldName) {

  const input = `<div class="form-item ${fieldName.required ? 'form-item--required' : ''}">
    <label for="${fieldName.name}" class="text-caption">${fieldName.label}</label>
    <input type="${fieldName.type}" name="${fieldName.name}" id="${fieldName.name}" ${fieldName.required ? 'required' : ''}>
    <span class="help-text text-caption">${fieldName.helpText}</span>
  </div>`;

  return input;
}

export default createInput;
