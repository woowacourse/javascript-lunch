import { html } from '../../lib/utils.ts';
import { Component } from '../core/index.ts';

interface ModalProps {
  id: string;
  children: HTMLElement;
  onModalClose: () => void;
}

export default class Modal extends Component<ModalProps> {
  override template() {
    return html`
      <div class="modal modal--open" id="${this.props.id ?? ''}">
        <div class="modal-backdrop"></div>
        <div class="modal-container"></div>
      </div>
    `;
  }

  override onRender() {
    this.appendChild(this.props.children, '.modal-container');
  }

  override addEventListener() {
    this._attachClickEventListener();
    this._attachKeyDownEventListener();
  }

  private _attachClickEventListener() {
    this.element.querySelector('[data-action="modal-cancel"]')?.addEventListener('click', this._removeModal.bind(this));
    this.element.querySelector('.modal-backdrop')?.addEventListener('click', this._removeModal.bind(this));
  }

  private _attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this._removeModal();
      }
    });
  }

  private _removeModal() {
    this.props.onModalClose();
  }
}
