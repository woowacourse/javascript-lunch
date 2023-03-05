import { $ } from '../util/dom';
import RestaurantBlock from './RestaurantBlock';

class RestaurantBlockList {
  template = () => `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;

  render = (target: HTMLElement) => {
    target.insertAdjacentHTML('beforeend', this.template());
  };

  replaceList(restaurantBlocks: RestaurantBlock[]) {
    $('.restaurant-list')?.replaceChildren();
    restaurantBlocks.forEach((block) => {
      $('.restaurant-list')?.insertAdjacentHTML('beforeend', block.template());
    });
  }
}

export default new RestaurantBlockList();
