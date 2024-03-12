import { CATEGORY_IMG_SRC } from '../constants/filter';

const RestaurantComponent = {
  render(restaurantList) {
    const $restaurantList = document.querySelector('.restaurant-list');
    restaurantList.forEach(element => {
      $restaurantList.appendChild(this.mounted(element.information));
    });
  },
  mounted(information) {
    const $li = document.createElement('li');
    $li.classList.add('restaurant');
    $li.innerHTML = `<div class="restaurant__category">
        <img src=${CATEGORY_IMG_SRC[information.category]} alt=${information.category} class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${information.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${information.distance}분 내</span>
        <p class="restaurant__description text-body">${information.description}</p>
      </div>`;

    return $li;
  },
};
export default RestaurantComponent;
