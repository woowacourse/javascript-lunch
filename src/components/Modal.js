import Button from './Button.js';
import Component from '../core/Component.js';
import InputBox from './InputBox.js';

class Modal extends Component {
  template() {
    return `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${this.props.children}
        </div>
      </div>
    `;
  }
}

export default Modal;
