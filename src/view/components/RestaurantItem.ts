import { CATEGORY_IMAGE_PATH, FAVORITE_IMAGE_PATH } from '../../constant';
import { Restaurant } from '../../type';

const RestaurantItem = {
  template: (restaurant: Restaurant) => `
    <li class="restaurant" item-id="${restaurant.itemId}"
      ><div class="restaurant__category">
        <img
          src="${
            CATEGORY_IMAGE_PATH[restaurant.category] ||
            CATEGORY_IMAGE_PATH['기타']
          }"
          alt="${restaurant.category}"
          class="category-icon"
        />
      </div>
      <button class="favorite-button"
       ><img src="${
         restaurant.isFavorite
           ? FAVORITE_IMAGE_PATH.starred
           : FAVORITE_IMAGE_PATH.unstarred
       }" class="favorite-icon" />
      </button>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스부터 ${restaurant.distanceInMinutes}분 내</span
        >
        <p class="restaurant__description text-body">${
          restaurant.description
        }</p>
        <a class="restaurant__link" href="${
          restaurant.link
        }" target="__blank">${restaurant.link}</a>
      </div>
    </li>
  `,
};

export default RestaurantItem;
