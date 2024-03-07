import { $ } from '../../util/dom.js';
import BaseComponent from '../baseComponent/BaseComponent.js';
import { CATEGORY, EVENT } from '../../types/types.ts';

class RestaurantCardComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setEvent();
  }

  render(instance, restaurantInfo) {
    console.log('instance :>> ', instance);
    console.log('restaurantInfo :>> ', restaurantInfo);
    const { category, name, distance, description } = restaurantInfo;
    const imageSource = Object.keys(CATEGORY).find((key) => CATEGORY[key] === category);

    $('.category-icon', instance).src = `./templates/category-${imageSource}.png`;
    $('.restaurant-card__name', instance).textContent = name;
    $('.restaurant-card__distance', instance).textContent = distance;
    $('.restaurant-card__description', instance).textContent = description;

    this.appendChild(instance);
  }

  setEvent() {
    this.on(
      { target: document, eventName: EVENT.clickedModalSubmitButton },
      this.#handleCreateCard.bind(this)
    );
  }

  removeEvent() {}

  #handleCreateCard(event) {
    const instance = this.getTemplate('#restaurant-card-template');
    const restaurantInfo = event.detail;
    this.render(instance, restaurantInfo);
  }
}

customElements.define('restaurant-card', RestaurantCardComponent);
