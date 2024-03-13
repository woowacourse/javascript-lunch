import './Modal.css';

import { RESTAURANT_FORM_EVENTS } from '../RestaurantForm/RestaurantForm';

export default class Modal extends HTMLElement {
  #shadowRoot;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.querySelector('#template-modal');
    const content = template.content.cloneNode(true);
    this.#shadowRoot.appendChild(content);
  }

  connectedCallback() {
    this.addEventListener(RESTAURANT_FORM_EVENTS.submit, this.#handleCloseModal.bind(this));
    this.addEventListener(RESTAURANT_FORM_EVENTS.reset, this.#handleCloseModal.bind(this));
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
