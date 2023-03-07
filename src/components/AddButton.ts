import RestaurantListItem from '../domain/RestaurantListItem';
import { IRestaurant } from '../domain/RestaurantListItem';
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
    const restaurantListContainer = document.querySelector('.restaurant-list-container') as HTMLDivElement;
    const addForm = document.querySelector('#addForm');

    cancelButton?.addEventListener('click', (e) => {
      e.preventDefault();
      AddButton.closeModal();
    });

    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const newRestaurant = Object.fromEntries(
        [...new FormData(e.target as HTMLFormElement)].map(([key, value]) => {
          return [key, key === 'distance' ? Number(value) : value];
        })
      ) as unknown as IRestaurant;
      restaurantListContainer.innerHTML = RestaurantList.template(RestaurantListItem.add(newRestaurant));

      AddButton.closeModal();
    });
  },
  closeModal() {
    const modal = document.querySelector('.modal--open') as HTMLElement;
    modal.className = 'modal';
  },
};

export default AddButton;
