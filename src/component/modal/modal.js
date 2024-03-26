import { $ } from '../../utils/selector';
import createNewRestaurantModal from './addRestaurantModal.js';
import createRestaurantDetailModal from './restaurantDetailModal.js';

const MODAL_LIST = {
  addRestaurant: (addRestaurantModalProps) =>
    createNewRestaurantModal(addRestaurantModalProps),
  restaurantDetail: (restaurantDetailProps) =>
    createRestaurantDetailModal(restaurantDetailProps),
};

export function closeModal() {
  $('.modal--open').remove();
}

// 모달은 2개 이상 켜지지 않는다
export function openModal(modalType, modalProps) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal--open';

  const modal = MODAL_LIST[modalType](modalProps);

  const backdrop = createModalBackdrop();
  modalContainer.append(backdrop, modal);

  backdrop.addEventListener('click', () => {
    closeModal();
  });

  document.body.append(modalContainer);

  // 길이가 작은 기기에서는 모달 스크롤 추가
  if (window.innerHeight < modal.clientHeight) {
    const $scrollContainer = $('.scroll-container');

    $scrollContainer.classList.remove('scroll-container');
    $scrollContainer.classList.add('scroll-container--on');
  }
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
