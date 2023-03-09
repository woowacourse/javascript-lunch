import { $inBody } from '../utils/selector';

class Modal {
  render() {
    $inBody('.restaurant-add-modal').insertAdjacentHTML(
      'beforeend',
      this.#template()
    );
  }

  #template() {
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
