import RestaurantList from '../domain/RestaurantList.ts';
import { $ } from '../utils';

class RestaurantBoxes extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        ul {
          display: flex;
          flex-direction: column;
        
          padding: 0 16px;
          margin: 16px 0;
        }`;

    this.shadowRoot.innerHTML = '<ul id="restaurantList"></ul>';
    this.shadowRoot.append(componentStyle);
  }

  drawRestaurants() {
    const categoryValue = $('#categoryFilter').getSelectValue();
    const sortingValue = $('#sortingFilter').getSelectValue();

    const englishSortingValue = sortingValue === '이름순' ? 'name' : 'distance';

    const filteredList = RestaurantList.getList(
      categoryValue,
      englishSortingValue
    );

    this.restaurantListRender(filteredList);
  }

  getRestaurant({ category, name, distance, description, link, isFavorite }) {
    return `<restaurant-box category="${category}" name="${name}" distance="${distance}" description="${description}" link="${link}" isFavorite="${isFavorite}"/>`;
  }

  restaurantListRender(restaurants) {
    this.shadowRoot.querySelector('#restaurantList').innerHTML = '';

    restaurants.forEach((restaurant) => {
      const restaurantTemplate = this.getRestaurant(restaurant);
      this.shadowRoot
        .querySelector('#restaurantList')
        .insertAdjacentHTML('beforeend', restaurantTemplate);
    });
  }
}

export default RestaurantBoxes;
