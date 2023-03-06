import './index.css';
import { $ } from '../../utils';

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="modal">
    <div id="modalBackdrop" class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
    </div>
  </div>
    `;
  }
}

export default Modal;
