import RestaurantList from '../domain/RestaurantList.ts';
import { $ } from '../utils';

class RestaurantBoxes extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
  }

  drawRestaurants() {
    const categoryValue = $('#categoryFilter').getSelectValue();
    const sortingValue = $('#sortingFilter').getSelectValue();

    const englishSortingValue = sortingValue === '이름순' ? 'name' : 'distance';

    const filteredList = RestaurantList.getList(
      categoryValue,
      englishSortingValue
    );

    if ($('#favoriteTab').isSelect()) {
      const favoriteRestaurant = filteredList.filter(
        (restaurant) => restaurant.isFavorite === true
      );
      this.restaurantListRender(favoriteRestaurant);
      return;
    }

    this.restaurantListRender(filteredList);
  }

  getRestaurant(restaurant) {
    const restaurantBox = document.createElement('restaurant-box');
    restaurantBox.update(restaurant);

    return restaurantBox;
  }

  restaurantListRender(restaurants) {
    this.shadowRoot.querySelector('#restaurantList').innerHTML = '';

    if (restaurants.length === 0) {
      this.shadowRoot.querySelector('#restaurantList').innerHTML =
        '<div class="empty">음식점 목록이 비었습니다</div>';
      return;
    }

    restaurants.forEach((restaurant) => {
      const restaurantTemplate = this.getRestaurant(restaurant);
      this.shadowRoot
        .querySelector('#restaurantList')
        .insertAdjacentElement('beforeend', restaurantTemplate);
    });
  }

  render() {
    this.shadowRoot.innerHTML = '<ul id="restaurantList"></ul>';
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        ul {
          display: flex;
          flex-direction: column;
          position:relative;
          top:200px;
          padding: 0 16px;
          margin: 16px 0;
        }
        
        .empty{
          display:flex;
          justify-content:center;
          align-items:center;
          height:400px;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
        }
      
        `;

    this.shadowRoot.append(componentStyle);
  }
}

export default RestaurantBoxes;
