import '../../css/modal.css';
import { $ } from '../utils/selector';

class Modal {
  #state = {
    selector: '',
    htmlTemplate: '',
  };

  constructor(selector) {
    this.#state.selector = selector;
  }

  render() {
    $(this.#state.selector).insertAdjacentHTML('beforeend', this.#template());
    $('.modal-container').insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    /* html */
    return `
			<div class="modal">
				<div class="modal-backdrop"></div>
				<div class="modal-container">
				</div>
			</div>
		`;
  }
}

export default Modal;
