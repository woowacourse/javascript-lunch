import RestaurantListStorageService from '../../services/restaurantListStorageService';
import RestaurantListItemDetail from '../restaurantListItemDetailModal/RestaurantListItemDetail';
import ListItemDetailBottomSheetEventHandler from '../restaurantListItemDetailModal/eventHandler';
import { RestaurantState } from '../../types';

function isHTMLElement(element: any): element is HTMLElement {
  return element instanceof HTMLElement;
}

const appendDetailToModal = (listItemDetailComponent: HTMLElement) => {
  const modal = document.getElementsByClassName('modal')[0];
  const modalContainer = document.getElementsByClassName('modal-container')[0];
  modal.classList.add('modal--open');
  modalContainer.appendChild(listItemDetailComponent);
};

const getRestaurantIdFromEventTarget = (event: Event): number | null => {
  if (!isHTMLElement(event.target)) return null;
  const target = event.target;
  const listItem = target?.closest('li');
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
    if (!isHTMLElement(event.target)) return;
    if (event.target.closest('.restaurant-list li')) RestaurantListItemDetailPhaseHandler(event);
  });
};

const showRestaurantListItemDetail = () => {
  document.addEventListener('DOMContentLoaded', listItemClickHandler);
};

export default showRestaurantListItemDetail;
