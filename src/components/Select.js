function createSelect(fieldName) {
  const select = `<div class="form-item form-item--required">
    <label for="${fieldName.name} text-caption">${fieldName.label}</label>
    <select name="${fieldName.name}" id="${fieldName.name}" required>
      <option value="">선택해 주세요</option>
      ${Array.from(fieldName.lists.values()).map((list) => {
        return `<option value="${list}">${list}</option>`;
      })}
    </select>
  </div>`;

  return select;
}

export default createSelect;
