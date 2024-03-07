import { $ } from '../../util/dom.js';
import BaseComponent from '../baseComponent/BaseComponent.js';
import { EVENT } from '../../types/types.js';

class GNBComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#gnb-template');
    this.render(instance);
    this.setEvent();
  }

  setEvent() {
    this.on(
      { target: $('.gnb__button'), eventName: 'click' },
      this.#handleClickAddButton.bind(this)
    );
  }

  removeEvent() {
    this.off(
      { target: $('.gnb__button'), eventName: 'click' },
      this.#handleClickAddButton.bind(this)
    );
  }

  #handleClickAddButton() {
    try {
      this.emit(EVENT.clickedGNBButton);
    } catch (error) {
      throw new Error();
    }
  }
}

customElements.define('g-n-b', GNBComponent);
