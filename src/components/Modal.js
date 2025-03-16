import Component from '../core/Component';

class Modal extends Component {
  template() {
    return `
        <div class="modal modal--open hidden">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">${this.props.modalTitle}</h2>
            ${this.props.content}
        </div>
      </div>
        `;
  }
}

export default Modal;
