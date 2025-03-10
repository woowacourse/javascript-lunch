function createTextarea(fieldName) {
  const textarea = `<div class="form-item">
      <label for="${fieldName.name} text-caption">${fieldName.label}</label>
      <textarea name="${fieldName.name}" id="${fieldName.name}" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">${fieldName.helpText}</span>
    </div>`;

  return textarea;
}

export default createTextarea;
