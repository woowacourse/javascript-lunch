import '../../css/modal.css';
import { $ } from '../utils/selector';

class Modal {
  #state = {
    container: '',
    modalId: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.container).insertAdjacentHTML('beforeend', this.#template());
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
