import { $ } from '../../util/dom.js';
import BaseComponent from '../baseComponent/BaseComponent.js';
import { EVENT } from '../../types/types.ts';

class RestaurantListComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#restaurant-list-template');
    this.render(instance);
    this.setEvent();
  }

  setEvent() {}

  removeEvent() {}
}

customElements.define('restaurant-list', RestaurantListComponent);
