import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-modal')
class Modal extends Component {
  constructor() {
    super();
    this.addEventListener('click', (event) => this.onClick(event));
  }

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  static get observedAttributes() {
    return ['open'];
  }

  open() {
    this.shadowRoot?.querySelector('dialog')?.showModal();
  }

  close() {
    this.shadowRoot?.querySelector('dialog')?.close();
  }

  private onClick(event: MouseEvent) {
    event.stopPropagation();
    this.close();
  }

  private onClickModal(event: MouseEvent) {
    event.stopPropagation();
  }

  private onClose() {
    this.dispatchEvent(new CloseEvent('close'));
  }

  override renderTemplate() {
    return `
      <dialog onclose="this.host.onClose(event)">
        <section onclick="this.host.onClickModal(event)">
          <slot name="header">
            <h2 class="text-title">${this.getAttribute('title') ?? ''}</h2>
          </slot>
          <slot name="content"></slot>
          <hr>
          <slot name="actions"></slot>
        </section>
      </dialog>
    `;
  }
}

export default Modal;
