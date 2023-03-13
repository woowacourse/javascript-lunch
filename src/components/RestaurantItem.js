import { CATEGORY_TO_FILENAME } from '../constants/constants';
import { $ } from '../utils/common';

class RestaurantItem {
  constructor($target, restaurant, restaurantInfoRender, listRender, setFavoriteState) {
    this.$target = $target;
    this.setFavorite = setFavoriteState;
    this.listRender = listRender;
    this.restaurantInfoRender = restaurantInfoRender;
    this.render(restaurant);
  }

  template(restaurant) {
    const imageFile = CATEGORY_TO_FILENAME[restaurant.category];

    return `
      <li id="li${restaurant.id}" class="restaurant">
        <div class="restaurant__category">
          <img src="./${imageFile}.png" alt="${restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <div class="restaurant__info__header">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>            
            <img id="${restaurant.id}" class="favorite-icon" src="./${
      restaurant.favorites ? 'favorite-icon-filled' : 'favorite-icon-lined'
    }.png" alt="${restaurant.name}">
          </div>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>  
          <p class="restaurant__description text-body">${restaurant.description}</p>
        </div>
      </li>
      `;
  }

  render(restaurant) {
    this.$target.insertAdjacentHTML('beforeend', this.template(restaurant));

    this.setItemEvent(restaurant);
    this.setFavoriteIconEvent(restaurant);
  }

  setFavoriteIconEvent(restaurant) {
    $(`#${restaurant.id}`).addEventListener('click', e => {
      this.setFavorite(e.target.id);
      this.listRender();
    });
  }

  setItemEvent(restaurant) {
    $(`#li${restaurant.id}`).addEventListener('click', e => {
      if (e.target.id !== `${restaurant.id}`) {
        this.restaurantInfoRender(restaurant);
      }
    });
  }
}

export default RestaurantItem;
