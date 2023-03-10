import errorHandler from '../../utils/errorHandler';
import CustomElement from '../CustomElement';

class RestaurantItem extends CustomElement {
  static get observedAttributes() {
    return ['favorite'];
  }

  private get name() {
    return this.getAttribute('name');
  }

  private get distanceByMinutes() {
    return this.getAttribute('distanceByMinutes');
  }

  private get description() {
    return this.getAttribute('description');
  }

  private get category() {
    return this.getAttribute('category');
  }

  private get isFavorite() {
    return this.hasAttribute('favorite');
  }

  renderTemplate = () => {
    return `
      <li class="restaurant" id="restaurant-item">
        <div class="restaurant__category">
          <img
            src="assets/categories/${this.category}.png"
            alt="${this.category}"
            class="category-icon"
          >
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">
            ${this.name}
          </h3>
          <span class="restaurant__distance text-body">
            캠퍼스부터 ${this.distanceByMinutes}분 내
          </span>
          <p class="restaurant__description text-body">${this.description ?? ''}</p>
        </div>
        <r-favorite-icon absolute ${this.isFavorite ? 'favorite' : ''} restaurantName="${
      this.name
    }"></r-favorite-icon>
      </li>
    `;
  };

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  clickRestaurant = ({ target }: Event) => {
    const { id } = target as HTMLElement;

    if (id === 'favorite-icon') return;

    this.dispatchEvent(
      new CustomEvent('openRestaurantDetailModal', {
        bubbles: true,
        detail: {
          name: this.name,
        },
      }),
    );
  };

  initEventHandlers = () => {
    const $restaurant = this.querySelector('#restaurant-item');

    if (!$restaurant) return errorHandler.doesNotExistElement();

    $restaurant.addEventListener('click', this.clickRestaurant);
  };
}

customElements.define('r-restaurant', RestaurantItem);

export default RestaurantItem;
