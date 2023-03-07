import RestaurantListItem from '../domain/RestaurantListItem';
import { IRestaurant, TCategory, TDistance } from '../domain/RestaurantListItem';
import RestaurantList from './RestaurantList';

const AddButton = {
  template() {
    return `<div class="button-container">
    <button type="button" class="button button--secondary text-caption">취소하기</button>
    <button class="button button--primary text-caption">추가하기</button>
  </div>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    const cancelButton = document.querySelector('.button--secondary');
    cancelButton?.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector('.modal--open') as HTMLElement;
      modal.className = 'modal';
    });

    const restaurantListContainer = document.querySelector('.restaurant-list-container') as HTMLElement;

    const addForm = document.querySelector('#addForm');
    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRestaurant = Object.fromEntries(
        [...new FormData(e.target as HTMLFormElement)].map(([key, value]) => {
          return [key, key === 'distance' ? Number(value) : value];
        })
      );
      restaurantListContainer.innerHTML = RestaurantList.template(RestaurantListItem.add(newRestaurant as unknown as IRestaurant));

      const modal = document.querySelector('.modal--open') as HTMLElement;
      modal.className = 'modal';
    });
  },
};

export default AddButton;
