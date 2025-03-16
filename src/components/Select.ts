interface SelectParams {
  name: string;
  label: string;
  lists: Map<string, string>;
  required: boolean;
}

function createSelect(fieldName: SelectParams) {
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
