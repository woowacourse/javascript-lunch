import Component from '@/components/Component';
import { define } from '@/components/decorators';
import type Restaurant from '@/domain/Restaurant';
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

  private onClickItem(event: Event) {
    if (!(event.target instanceof RestaurantListItem)) return;

    const $restaurantListItem = event.target;
    const restaurantId = $restaurantListItem.getAttribute('restaurant-id');
    if (!restaurantId) return;

    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        detail: Number(restaurantId),
      }),
    );
  }

  override getRenderTemplate() {
    const restaurants = this.#restaurants
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
          ></r-restaurant-list-item>
        `;
      })
      .join('');

    return `
      <ul>${restaurants}</ul>

      <slot name="placeholder">
        <div class="placeholder">
          목록이 비어있습니다
        </div>
      </slot>
    `;
  }

  protected override renderCallback() {
    this.shadowRoot!.querySelectorAll('r-restaurant-list-item').forEach(($item) =>
      $item.addEventListener('click', (event) => this.onClickItem(event)),
    );
  }
}

export default RestaurantList;
