import { RESTAURANT_DETAIL_EVENTS } from './RestaurantDetail';
import { RESTAURANT_FORM_EVENTS } from './RestaurantForm';

export default class Modal extends HTMLElement {
  #shadowRoot;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.querySelector('#template-modal');
    const content = template.content.cloneNode(true);
    this.#shadowRoot.appendChild(content);
  }

  // eslint-disable-next-line max-lines-per-function
  connectedCallback() {
    if (this.id === 'addModal') {
      this.addEventListener(RESTAURANT_FORM_EVENTS.submit, this.#handleCloseModal.bind(this));
      this.addEventListener(RESTAURANT_FORM_EVENTS.reset, this.#handleCloseModal.bind(this));
    } else if (this.id === 'detailModal') {
      this.addEventListener(RESTAURANT_DETAIL_EVENTS.delete, this.#handleCloseModal.bind(this));
      this.addEventListener(RESTAURANT_DETAIL_EVENTS.close, this.#handleCloseModal.bind(this));
    }

    this.#shadowRoot.querySelector('.modal-backdrop').addEventListener('click', this.#handleCloseModal.bind(this));
  }

  openModal() {
    const modal = this.#shadowRoot.querySelector('.modal');
    modal.classList.add('modal--open');
  }

  #handleCloseModal() {
    const modal = this.#shadowRoot.querySelector('.modal');
    modal.classList.remove('modal--open');
  }
}
