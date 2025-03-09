import Component from '../core/Component.ts';
import { html } from '../lib/utils.ts';

interface ModalProps {
  id: string;
  children: string;
}

export default class Modal extends Component<ModalProps> {
  template() {
    return html`
      <div class="modal" id="${this.props.id}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">${this.props.children}</div>
      </div>
    `;
  }
}
