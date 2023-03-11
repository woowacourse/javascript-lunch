import { restaurant } from '../../domain/restaurant';
import { $ } from '../../utils';
import RestaurantBox from '../RestaurantBox';
import './index.css';

class ConvertList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="convert-list-container">
        <div id="allRestaurant" class="convert-list clicked">모든 음식점</div>
        <div id="favoriteRestaurant" class="convert-list">자주 가는 음식점</div>
    </div>
    `;
    this.modalHandler();
  }

  modalHandler() {
    $('#allRestaurant').addEventListener('click', this.showAllRestaurants);
    $('#favoriteRestaurant').addEventListener(
      'click',
      this.showFavoriteRestaurants
    );
  }

  showAllRestaurants() {
    $('#allRestaurant').classList.add('clicked');
    $('#favoriteRestaurant').classList.remove('clicked');
    const allRestaurants = new RestaurantBox();
    allRestaurants.renderRestaurantList(restaurant.restaurants);
  }

  showFavoriteRestaurants() {
    $('#allRestaurant').classList.remove('clicked');
    $('#favoriteRestaurant').classList.add('clicked');
    const favoriteRestaurant = new RestaurantBox();
    favoriteRestaurant.renderRestaurantList(restaurant.favoriteRestaurants);
  }
}

export default ConvertList;
