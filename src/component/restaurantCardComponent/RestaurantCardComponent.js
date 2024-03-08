import { $ } from '../../util/dom.js';
import BaseComponent from '../baseComponent/BaseComponent.js';
import { CATEGORY, EVENT } from '../../types/types';

class RestaurantCardComponent extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    const instance = this.getTemplate('#restaurant-card-template');

    const restaurantInfo = {
      category: this.dataset.category,
      name: this.dataset.name,
      distance: this.dataset.distance,
      description: this.dataset.description,
      link: this.dataset.link
    };

    this.render(instance, restaurantInfo);
  }

  render(instance, restaurantInfo) {
    const { category, name, distance, description } = restaurantInfo;
    const imageSource = Object.keys(CATEGORY).find((key) => CATEGORY[key] === category);

    $('.category-icon', instance).src = `./templates/category-${imageSource}.png`;
    $('.restaurant-card__name', instance).textContent = name;
    $('.restaurant-card__distance', instance).textContent = distance;
    $('.restaurant-card__description', instance).textContent = description;

    this.appendChild(instance);
  }
}

customElements.define('restaurant-card', RestaurantCardComponent);
