interface InputParams {
  name: string;
  label: string;
  type: string;
  helpText: string;
  required: boolean;
}

function createInput(fieldName: InputParams) {
  const input = `<div class="form-item ${fieldName.required ? 'form-item--required' : ''}">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <input type="${fieldName.type}" name="${fieldName.name}" id="${fieldName.name}">
    <span class="help-text text-caption">${fieldName.helpText}</span>
  </div>`;

  return input;
}

export default createInput;
