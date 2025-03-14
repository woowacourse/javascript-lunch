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
    this.element?.addEventListener('click', (event) => {
      if (!event.target) return;

      const target = event.target as HTMLElement;

      if (target.closest('#modal-cancel') || target.closest('.modal-backdrop')) {
        this.#removeModal();
        return;
      }
    });
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.#removeModal();
    });
  }

  #removeModal() {
    this.element?.querySelector(`#${this.props?.id}`)?.classList.remove('modal--open');
  }
}
