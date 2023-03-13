import { Restaurants } from '../../types';
import RestaurantItem from '../RestaurantItem';
import $template from './index.html';

interface Props {
  restaurants: Restaurants;
  onRestaurantItemClick: (restaurantId: string) => void;
  onFavoriteButtonClick: (restaurantId: string) => void;
}
class RestaurantItems extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  setProps({ restaurants, onRestaurantItemClick, onFavoriteButtonClick }: Props) {
    this.render(restaurants);
    const $restaurantItems = this.querySelectorAll<RestaurantItem>('restaurant-item');

    $restaurantItems.forEach(($restaurantItem) => {
      const id = $restaurantItem.getAttribute('id') as string;
      $restaurantItem.setProps({
        restaurant: restaurants[id],
        onRestaurantItemClick,
        onFavoriteButtonClick,
      });
    });
  }

  render(restaurants: Restaurants) {
    const $restaurantList = this.querySelector('.restaurant-list') as HTMLUListElement;
    $restaurantList.innerHTML = '';
    Object.entries(restaurants).forEach(([id, restaurant]) => {
      $restaurantList.insertAdjacentHTML(
        'beforeend',
        `<restaurant-item id=${id}></restaurant-item>`,
      );
    });
  }
}

export default RestaurantItems;
