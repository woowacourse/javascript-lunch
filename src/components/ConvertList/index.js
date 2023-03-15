import { restaurant } from '../../domain/restaurant';
import { $ } from '../../utils';
import RestaurantBox from '../RestaurantBox';
import './index.css';

class ConvertList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleModal();
  }

  render() {
    this.innerHTML = `
    <div class="convert-list-container">
        <div id="allRestaurant" class="convert-list clicked">모든 음식점</div>
        <div id="favoriteRestaurant" class="convert-list">자주 가는 음식점</div>
    </div>
    `;
  }

  handleModal() {
    $('#allRestaurant').addEventListener('click', this.showAllRestaurants);
    $('#favoriteRestaurant').addEventListener(
      'click',
      this.showFavoriteRestaurants
    );
  }

  showAllRestaurants() {
    $('#allRestaurant').classList.add('clicked');
    $('#favoriteRestaurant').classList.remove('clicked');
    $('#categoryFilter').classList.remove('hide');
    $('#sortingFilter').classList.remove('hide');

    const allRestaurants = new RestaurantBox();
    allRestaurants.renderRestaurantList(restaurant.restaurants);
  }

  showFavoriteRestaurants() {
    $('#allRestaurant').classList.remove('clicked');
    $('#favoriteRestaurant').classList.add('clicked');
    $('#categoryFilter').classList.add('hide');
    $('#sortingFilter').classList.add('hide');

    const favoriteRestaurant = new RestaurantBox();
    favoriteRestaurant.renderRestaurantList(restaurant.favoriteRestaurants);
  }
}

export default ConvertList;
