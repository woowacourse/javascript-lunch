import { restaurant } from '../../domain/restaurant';
import { $ } from '../../utils';
import './index.css';

class RestaurantBox extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderRestaurantList(restaurant.restaurants);
  }

  render() {
    this.innerHTML = `
    <section class="restaurant-list-container">
      <ul id="restaurantList" class="restaurant-list">
      </ul>
    </section>
    `;
  }

  renderRestaurantList(restaurantList) {
    $('#restaurantList').innerHTML = '';

    restaurantList.forEach((restaurantInfo) => {
      const { id, category, name, distance, description, link, isFavorite } =
        restaurantInfo;
      const tagContent = `<restaurant-info
          id = "${id}"
          category="${category}"
          name="${name}"
          distance="${distance}"
          description="${description}"
          link="${link}"
          isFavorite="${isFavorite}"
        ></restaurant-info>`;

      $('#restaurantList').insertAdjacentHTML('beforeend', tagContent);
    });
  }
}

export default RestaurantBox;
