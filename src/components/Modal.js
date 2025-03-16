import Component from '../core/Component';

class Modal extends Component {
  template() {
    return `
        <div class="modal modal--open hidden">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            ${this.props.content}
        </div>
      </div>
        `;
  }
}

export default Modal;
