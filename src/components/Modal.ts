import '../../css/modal.css';
import { $ } from '../utils/selector';

class Modal {
  #state = {
    container: '',
    modalId: '',
  };

  constructor(state: { container: string; modalId: string }) {
    this.#state = state;
  }

  render() {
    const modalContainer = $(this.#state.container);

    if (modalContainer) {
      modalContainer.insertAdjacentHTML('beforeend', this.#template());
    }
  }

  #template() {
    /* html */
    return `
			<div class="modal" id="${this.#state.modalId}">
			</div>
		`;
  }
}

export default Modal;
