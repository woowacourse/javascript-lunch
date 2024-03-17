import generateModal from './template/generateModal';
import { $ } from '../utils/dom';

class Modal {
  constructor({ targetId }) {
    this.element = $(targetId);
  }

  render(content) {
    generateModal(this.element, content);
  }

  openModal() {
    this.element.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.element.classList.remove('modal--open');
    document.body.style.overflow = 'auto';
  }
}

export default Modal;
