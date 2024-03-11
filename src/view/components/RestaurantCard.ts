import { IRestaurantInfo } from '../../domain/Restaurant';

const IMG_CATEGORY = Object.freeze({
  한식: 'korean',
  아시안: 'asian',
  중식: 'chinese',
  기타: 'etc',
  양식: 'western',
  일식: 'japanese',
});

class RestaurantCard extends HTMLLIElement {
  constructor(restaurantInfo: IRestaurantInfo) {
    super();
    this.classList.add('restaurant');
    this.innerHTML = this.#generateInnerHTML(restaurantInfo);
  }

  #generateInnerHTML({ category, name, distanceFromCampus, description }: IRestaurantInfo) {
    return `
        <div class="restaurant__category">
          <img src="./templates/category-${IMG_CATEGORY[category]}.png" alt="${category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
        </div>
      `;
  }
}

export default RestaurantCard;
