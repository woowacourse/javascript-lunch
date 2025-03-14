import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';

interface ModalProps {
  id: string;
  children: string;
}

export default class Modal extends Component<ModalProps> {
  template() {
    return html`
      <div class="modal" id="${this.props?.id ?? ''}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">${this.props?.children ?? ''}</div>
      </div>
    `;
  }

  attachEventListener() {
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  #attachClickEventListener() {
    this.element?.querySelector('#modal-cancel')?.addEventListener('click', this.#removeModal.bind(this));
    this.element?.querySelector('.modal-backdrop')?.addEventListener('click', this.#removeModal.bind(this));
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.#removeModal.bind(this)();
    });
  }

  #removeModal() {
    this.element?.querySelector(`#${this.props?.id}`)?.classList.remove('modal--open');
  }
}
