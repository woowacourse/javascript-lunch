import store from '../../store';
import RestaurantItems from '../RestaurantItems';
import $template from './index.html';

class Tab extends HTMLElement {
  connectedCallback() {
    this.render();
    const $allRestaurant = this.querySelector('.tab-all')!;
    const $favoriteRestaurant = this.querySelector('.tab-favorite')!;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    const $selectBox = document.querySelector('select-box') as HTMLElement;

    // 모든 음식점
    $allRestaurant.addEventListener('click', () => {
      $favoriteRestaurant.removeAttribute('clicked');
      $allRestaurant.setAttribute('clicked', '');

      $restaurantItems.render(store.restaurants);
      $selectBox.style.display = '';
    });

    // 자주 가는 음식점
    $favoriteRestaurant.addEventListener('click', () => {
      $allRestaurant.removeAttribute('clicked');
      $favoriteRestaurant.setAttribute('clicked', '');

      $restaurantItems.render(store.getFavoriteRestaurants());
      $selectBox.style.display = 'none';
    });
  }

  render() {
    this.innerHTML = $template;
  }
}

export default Tab;
