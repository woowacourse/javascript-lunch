import RestaurantListStorageService from '../../services/restaurantListStorageService';
import RestaurantListItemDetail from '../restaurantListItemDetailModal/RestaurantListItemDetail';
import ListItemDetailBottomSheetEventHandler from '../restaurantListItemDetailModal/eventHandler';
import { RestaurantState } from '../../types';

const appendDetailToModal = (listItemDetailComponent: HTMLElement) => {
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  modal.classList.add('modal--open');
  modalContainer.appendChild(listItemDetailComponent);
};

const getRestaurantIdFromEventTarget = (event: Event): number | null => {
  const target = event.target as Element as HTMLElement;
  const listItem = target?.closest('li') as HTMLLIElement;
  return listItem ? Number(listItem.dataset.id) : null;
};

const getRestaurantDataById = (restaurantId: number) => {
  return RestaurantListStorageService.getData()?.find((restaurant) => restaurant.id === restaurantId) ?? null;
};

const createAndAppendDetailComponent = (restaurant: RestaurantState | null) => {
  if (restaurant) {
    const listItemDetailComponent = RestaurantListItemDetail(restaurant);
    appendDetailToModal(listItemDetailComponent);
    ListItemDetailBottomSheetEventHandler(restaurant);
  }
};

const RestaurantListItemDetailPhaseHandler = (event: Event) => {
  const restaurantId = getRestaurantIdFromEventTarget(event);
  if (restaurantId !== null) {
    const restaurantData = getRestaurantDataById(restaurantId);
    createAndAppendDetailComponent(restaurantData);
  }
};

const listItemClickHandler = () => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.closest('.restaurant-list li')) {
      RestaurantListItemDetailPhaseHandler(event);
    }
  });
};

const showRestaurantListItemDetail = () => {
  document.addEventListener('DOMContentLoaded', listItemClickHandler);
};

export default showRestaurantListItemDetail;
