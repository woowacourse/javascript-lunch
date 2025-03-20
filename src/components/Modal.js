import createDOMElement from '../util/createDomElement.js';
import { lockScroll, unlockScroll } from '../util/scroll.js';
import { $ } from '../util/selector.js';

class Modal {
  constructor() {
    this.modal = $('.modal') || this.#createModal();
    this.content = this.modal.querySelector('.modal-content');

    this.handleEscKey = this.#handleEscKey.bind(this);
  }

  #createModal() {
    const modal = createDOMElement({
      tag: 'div',
      className: 'modal',
      children: [
        createDOMElement({
          tag: 'div',
          className: 'modal-backdrop',
          onClick: () => this.close()
        }),
        createDOMElement({
          tag: 'div',
          className: 'modal-content'
        })
      ]
    });

    document.body.appendChild(modal);
    return modal;
  }

  open(content) {
    this.content.innerHTML = '';
    this.content.appendChild(content);

    this.modal.classList.add('modal--open');
    lockScroll();
    document.addEventListener('keydown', this.handleEscKey);
  }

  close() {
    this.modal.classList.remove('modal--open');
    unlockScroll();
    document.removeEventListener('keydown', this.handleEscKey);
    this.content.innerHTML = '';
  }

  #handleEscKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

export default new Modal();
