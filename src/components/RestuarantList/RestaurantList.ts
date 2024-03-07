import { CATEGORIES } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import restaurantListMock from '@/mock/restaurantList.mock';

const iconUrl = '@/assets/category-korean.png';

const restaurantListHTML = restaurantListMock
  .map((restaurant) => {
    const { category, name, distance, description } = restaurant;
    return `<li class="restaurant">
<div class="restaurant__category">
<img src="${iconUrl}" alt=${category} class="category-icon" />
</div>
<div class="restaurant__info">
<h3 class="restaurant__name text-subtitle">${name}</h3>
<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
<p class="restaurant__description text-body">
${description}
</p>
</div>
</li>`;
  })
  .join('');

class RestaurantList extends BaseComponent {
  render() {
    this.innerHTML = `
        <ul class="restaurant-list">
    ${restaurantListHTML}
        </ul>
      `;
  }
}

customElements.define('restaurant-list', RestaurantList);
