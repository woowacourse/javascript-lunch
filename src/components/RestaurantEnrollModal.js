import createElement from '../utils/createElement.js';
import Modal from './Modal.js';
import { createRestaurantEnrollForm } from './RestaurantEnrollForm.js';
import { resetInput } from './RestaurantEnrollForm.js';

function createRestaurantEnrollModal() {
  const modal = new Modal();

  const $modalTitle = createElement({
    tag: 'h2',
    className: 'modal-title text-title',
    textContent: '새로운 음식점',
  });

  const $enrollForm = createRestaurantEnrollForm(() => modal.toggle());

  const fragment = new DocumentFragment();
  fragment.append($modalTitle, $enrollForm);

  modal.appendModalContent(fragment);

  return modal;
}

export default createRestaurantEnrollModal;
