import { store } from '../store';
import RestaurantItem from './RestaurantItem';

export default class RestaurantList {
  $restaurantListSection = document.createElement('section');
  $ul = document.createElement('ul');

  constructor() {
    if (!store.$listArticle) return;
    this.$restaurantListSection.className = 'restaurant-list-container';
    this.$ul.className = 'restaurant-list';

    this.render(store.$listArticle);
  }

  renderUl() {
    this.$ul.innerHTML = '';
    if (!store.currentList.length) {
      this.$ul.innerHTML =
        '<p class="no-list-message text-body">조회 가능한 식당이 없습니다.</p>';
      return;
    }

    for (const restaurant of store.currentList) {
      this.$ul.insertAdjacentElement('beforeend', RestaurantItem(restaurant));
    }
  }

  render = ($targetElement: HTMLElement) => {
    this.$restaurantListSection.innerHTML = '';
    this.renderUl();
    this.$restaurantListSection.appendChild(this.$ul);

    $targetElement.insertAdjacentElement(
      'beforeend',
      this.$restaurantListSection
    );
  };
}
