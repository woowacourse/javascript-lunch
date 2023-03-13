import '../../css/modal.css';
import { $ } from '../utils/selector';

class Modal {
  #state = {
    selector: '',
    id: '',
    backdrop: '',
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
			<div class="modal" id="${this.#state.id}">
				<div class="${this.#state.backdrop}"></div>
				<div class="${this.#state.container}">
				</div>
			</div>
		`;
  }
}

export default Modal;
