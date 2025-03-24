function createModal(type) {
  const templateId =
    type === 'new-restaurant' ? '#new-restaurant-modal-template' : '#restaurant-detail-modal-template';
  const template = document.querySelector(templateId);
  return template.content.cloneNode(true);
}

export default createModal;
