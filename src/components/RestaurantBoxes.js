import { GLOBAL_CSS } from '../constants';

class RestaurantBoxes extends HTMLElement {
  getRestaurant({ category, name, distance, description }) {
    return `<restaurant-box category="${category}" name="${name}" distance="${distance}" description="${description}"/>`;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .restaurant-list {
        display: flex;
        flex-direction: column;
      
        padding: 0 16px;
        margin: 16px 0;
      }
      
`;

    this.shadowRoot.innerHTML =
      '<ul id="restaurantList" class="restaurant-list"></ul>';
    this.shadowRoot.append(globalStyle, componentStyle);
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
