import { CATEGORY_IMG_SRC } from '../constants/filter';

const RestaurantComponent = information => {
  return `<li class="restaurant">
    <div class="restaurant__category">
      <img src=${CATEGORY_IMG_SRC[information.category]} alt=${information.category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${information.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${information.distance}분 내</span>
      <p class="restaurant__description text-body">${information.description}</p>
    </div>
    </li>`;
};

export default RestaurantComponent;
