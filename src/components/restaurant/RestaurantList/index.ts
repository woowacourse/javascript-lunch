import Restaurant from '../../../domain/Restaurant';
import Component from '../../Component';
import { define } from '../../decorators';
import RestaurantListItem from '../RestaurantListItem';
import style from './index.css';

export type RestaurantClickEvent = CustomEvent<Restaurant['id']>;

@define('r-restaurant-list')
class RestaurantList extends Component {
  #restaurants: Restaurant[] = [];

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  setRestaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants;
    this.render();
  }

  getRestaurants() {
    return this.#restaurants;
  }

  onClickItem(event: MouseEvent) {
    if (!(event.target instanceof RestaurantListItem)) return;

    const $restaurantListItem = event.target;
    const restaurantId = $restaurantListItem.getAttribute('restaurant-id');
    if (!restaurantId) return;

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        detail: restaurantId,
      }),
    );
  }

  override renderTemplate() {
    return `
      <ul>
        ${this.#restaurants
          .map((restaurant) => {
            return `
              <r-restaurant-list-item
                restaurant-id="${restaurant.getId()}"
                category="${restaurant.getCategory() ?? ''}"
                name="${restaurant.getName()}"
                distance="${restaurant.getDistance()}"
                description="${restaurant.getDescription() ?? ''}"
                reference-url="${restaurant.getReferenceUrl() ?? ''}"
                ${restaurant.isFavorite() ? 'favorite' : ''}

                onclick="this.host.onClickItem(event)"
              ></r-restaurant-list-item>
            `;
          })
          .join('')}
      </ul>
    `;
  }
}

export default RestaurantList;
