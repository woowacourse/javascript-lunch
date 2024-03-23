import './Modal.css';

import { RESTAURANT_FORM_EVENTS } from '../RestaurantForm/RestaurantForm';
import { RESTAURANT_DETAIL_EVENTS } from '../RestaurantDetail/RestaurantDetail';

export default class Modal extends HTMLElement {
  #backdrop;

  #container;

  constructor() {
    super();

    const template = document.querySelector('#template-modal');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.classList.add('modal');

    this.#backdrop = this.querySelector('.modal-backdrop');
    this.#container = this.querySelector('.modal-container');
  }

  connectedCallback() {
    this.addEventListener(RESTAURANT_FORM_EVENTS.submit, this.#closeModal.bind(this));
    this.addEventListener(RESTAURANT_FORM_EVENTS.reset, this.#closeModal.bind(this));
    this.addEventListener(RESTAURANT_DETAIL_EVENTS.deleteItem, this.#closeModal.bind(this));
    this.addEventListener(RESTAURANT_DETAIL_EVENTS.closeModal, this.#closeModal.bind(this));
    this.#backdrop.addEventListener('click', this.#closeModal.bind(this));
  }

  openModal({ title, body }) {
    this.#container.innerHTML = '';
    if (title) this.#container.appendChild(title);
    if (body) this.#container.appendChild(body);

    this.classList.add('modal--open');
  }

  #closeModal() {
    this.#container.innerHTML = '';
    this.classList.remove('modal--open');
  }
}
