function createButton(fieldName) {
  const button = `<button type="${fieldName.type}" class="button ${fieldName.className} text-caption">${fieldName.content}</button>`;
  return button;
}

export default createButton;
