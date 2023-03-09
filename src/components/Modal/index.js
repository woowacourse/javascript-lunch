import './index.css';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div id="modalContainer" class="modal">
      <div id="modalBackdrop" class="modal-backdrop"></div>
    </div>
    `;
  }
}

export default Modal;
