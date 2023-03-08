import RestaurantDetail from './ResraurantDetail';
import RestaurantAddForm from './RestaurantAddForm';

type ModalContentType = 'detail' | 'addForm';

const Modal = {
  render(targetElement: Element, content: ModalContentType) {
    targetElement.innerHTML = this.getTemplate(content);
  },

  getTemplate(content: ModalContentType) {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.getModalContent(content)}
    </div>
    `;
  },

  getModalContent(contentType: ModalContentType) {
    if (contentType === 'detail') return RestaurantDetail.getTemplate();
    if (contentType === 'addForm') return RestaurantAddForm.getTemplate();
  },
};

export default Modal;
