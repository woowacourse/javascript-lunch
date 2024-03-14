import RestaurantListStorageService from '../../services/restaurantListStorageService';
import RestaurantListItemDetail from '../restaurantListItemDetailModal/RestaurantListItemDetail';
import { ListItemDetailBottomSheetEventHandler } from '../restaurantListItemDetailModal/eventHandler';

const appendDetailToModal = (listItemDetailComponent: HTMLElement) => {
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  modal.classList.add('modal--open');
  modalContainer.appendChild(listItemDetailComponent);
};

const RestaurantListItemDetailPhaseHandler = (event: Event) => {
  const target = event.target as Element as HTMLElement;
  if (target) {
    const listItem = target.closest('li') as HTMLLIElement;
    const restaurantId = Number(listItem.dataset.id);
    const targetRestaurantListItem =
      RestaurantListStorageService.getData()!.filter((restaurant) => restaurant.id === restaurantId)[0] ?? [];
    const listItemDetailComponent = RestaurantListItemDetail(targetRestaurantListItem);
    appendDetailToModal(listItemDetailComponent);
    ListItemDetailBottomSheetEventHandler(targetRestaurantListItem);
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
