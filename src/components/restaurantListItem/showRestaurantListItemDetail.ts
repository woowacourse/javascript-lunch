import RestaurantListStorageService from '../../services/restaurantListStorageService';
import RestaurantListItemDetail from '../restaurantListItemDetailModal/RestaurantListItemDetail';
import Modal from '../modal/Modal';

const RestaurantListItemDetailPhaseHandler = (event: Event) => {
  const target = event.target as Element as HTMLElement;
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  if (target) {
    const listItem = target.closest('li') as HTMLLIElement;
    const restaurantId = Number(listItem.dataset.id);
    const targetRestaurantListItem =
      RestaurantListStorageService.getData()!.filter((restaurant) => restaurant.id === restaurantId)[0] ?? [];
    const listItemDetailComponent = RestaurantListItemDetail(targetRestaurantListItem);
    modal.classList.add('modal--open');
    modalContainer.appendChild(listItemDetailComponent);
    console.log(listItemDetailComponent);
  }
};

const listItemClickHandler = () => {
  const listContainer = document.querySelector('.restaurant-list') as HTMLLIElement;
  listContainer.addEventListener('click', (event) => RestaurantListItemDetailPhaseHandler(event));
};

const showRestaurantListItemDetail = () => {
  document.addEventListener('DOMContentLoaded', listItemClickHandler);
};

export default showRestaurantListItemDetail;
