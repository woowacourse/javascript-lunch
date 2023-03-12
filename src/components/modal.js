import '../../css/modal.css';
import { $ } from '../utils/selector';

class Modal {
  #state = {
    selector: '',
    container: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render() {
    $(this.#state.selector).insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    /* html */
    return `
			<div class="modal">
				<div class="modal-backdrop"></div>
				<div class="${this.#state.container}">
				</div>
			</div>
		`;
  }
}

export default Modal;
