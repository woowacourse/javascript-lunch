import { Category } from '../../data/image';
import RestaurantListItem, { IRestaurant } from '../../domain/RestaurantListItem';
import DetailModal from './DetailModal';
import FavoriteIcon from './FavoriteIcon';

const Restaurant = {
  template(restaurant: IRestaurant) {
    return `
      <li class="restaurant" data-id="${restaurant.id}">
        <div class="restaurant__category">
          <img src="${Category[restaurant.category]}" alt="${restaurant.category}" class="category-icon">
        </div>
        <div class="restaurant__info">
          ${FavoriteIcon.template(restaurant.favorite, restaurant.id)}
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
          <p class="restaurant__description text-body">${restaurant?.description}</p>
        </div>
      </li>
      ${DetailModal.template(restaurant)}`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    DetailModal.setEvent(RestaurantListItem);
    FavoriteIcon.setEvent(RestaurantListItem);

    const restaurants = document.querySelectorAll('.restaurant') as NodeListOf<HTMLElement>;

    restaurants.forEach((item) => {
      item?.addEventListener('click', () => {
        DetailModal.openModal();
      });
    });
  },
  remove(id: string) {
    const restaurants = document.querySelectorAll('.restaurant') as NodeListOf<HTMLElement>;

    restaurants.forEach((item) => {
      if (item.dataset.id === id) {
        item.remove();
      }
    });
  },
};

export default Restaurant;
