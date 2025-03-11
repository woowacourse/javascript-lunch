function createButton(fieldName) {
  const button = `<button type="${fieldName.type}" class="button ${fieldName.classNames.join(' ')} text-caption">${
    fieldName.content
  }</button>`;
  return button;
}

export default createButton;
