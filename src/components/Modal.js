function createModal() {
  const template = document.querySelector('#modal-template');
  return template.content.cloneNode(true);
}

export default createModal;
