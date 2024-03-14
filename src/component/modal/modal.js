import { $ } from '../../utils/selector';
import createNewRestaurantModal from './addRestaurantModal.js';
import createRestaurantDetailModal from './restaurantDetailModal.js';

const MODAL_LIST = {
  addRestaurant: ({ addRestaurant, getRestaurantList }) =>
    createNewRestaurantModal({ addRestaurant, getRestaurantList }),
  restaurantDetail: (restaurant) => createRestaurantDetailModal(restaurant),
};

export function closeModal() {
  $('.modal--open').remove();
}

// 모달은 2개 이상 켜지지 않는다
export function openModal(modalType, modalArgs) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal--open';

  const modal = MODAL_LIST[modalType](modalArgs);

  const backdrop = createModalBackdrop();
  modalContainer.append(backdrop, modal);

  backdrop.addEventListener('click', () => {
    closeModal();
  });

  document.body.append(modalContainer);
}

export function createModalContainer() {
  const container = document.createElement('div');
  container.className = 'modal-container';

  return container;
}

function createModalBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}
