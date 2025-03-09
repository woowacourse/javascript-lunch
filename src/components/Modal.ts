import Component from '../core/Component.ts';

interface ModalProps {
  id: string;
  children: string;
}

export default class Modal extends Component<ModalProps> {
  template() {
    return `
      <div class="modal" id="${this.props.id}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${this.props.children}
        </div>
      </div>
    `;
  }
}
