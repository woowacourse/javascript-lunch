function createMultiSelect(fieldName) {
  const multiSelect = `<select name="${fieldName.name}" id="${fieldName.id}" class="${fieldName.class}">
${fieldName.options.map(option => {
    return `<option value="${option}">${option}</option>`;
  }).join('')}
          </select>`
  return multiSelect;
}

export default createMultiSelect;