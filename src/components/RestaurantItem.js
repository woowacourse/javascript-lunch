import { CATEGORY_TO_FILENAME } from '../constants/constants';

class RestaurantItem {
  template(restaurant) {
    const imageFile = CATEGORY_TO_FILENAME[restaurant.category];

    return `
      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./${imageFile}.png" alt="${restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <div class="restaurant__info__header">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>            
            <img class="favorite-icon" src="./${
              restaurant.favorites ? 'favorite-icon-filled' : 'favorite-icon-lined'
            }.png" alt="${restaurant.name}">
          </div>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>  
          <p class="restaurant__description text-body">${restaurant.description}</p>
        </div>
      </li>
      `;
  }

  makeItemList(restaurantList) {
    return restaurantList.reduce((result, restaurant) => result + this.template(restaurant), '');
  }
}

export default RestaurantItem;
