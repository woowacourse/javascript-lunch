import { CATEGORY_TO_FILENAME } from '../constants/constants';
import { $ } from '../utils/common';

class RestaurantItem {
  constructor($target, restaurant, callbackFunction) {
    this.$target = $target;
    this.eventFunction = callbackFunction;
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
      this.eventFunction.setFavorite(e.target.id);

      if ($('.current').innerText === '모든 음식점') {
        this.eventFunction.listRender();
        return;
      }

      this.eventFunction.favoriteRender();
    });
  }

  setItemEvent(restaurant) {
    $(`#li${restaurant.id}`).addEventListener('click', e => {
      if (e.target.id !== `${restaurant.id}`) {
        this.eventFunction.infoRender(
          restaurant,
          this.eventFunction.listRender.bind(this),
          this.eventFunction.favoriteRender.bind(this)
        );
      }
    });
  }
}

export default RestaurantItem;
