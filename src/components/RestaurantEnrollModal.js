import createElement from '../utils/createElement.js';
import RestaurantValidator from '../validators/RestaurantValidator.js';
import Modal from './common/Modal.js';
import createRestaurantEnrollForm from './RestaurantEnrollForm.js';
import { updateRestaurantList } from './RestaurantList.js';

function handleClose() {
  document.querySelector('select#category').value = '';
  document.querySelector('input#name').value = '';
  document.querySelector('select#distance').value = '';
  document.querySelector('textarea#description').value = '';
  document.querySelector('input#link').value = '';
}

function createRestaurantEnrollModal() {
  const modal = new Modal(handleClose);

  const restaurantInput = {
    name: null,
    category: null,
    distance: null,
    description: null,
    link: null,
  };

  const $modalTitle = createElement({
    tag: 'h2',
    className: 'modal-title text-title',
    textContent: '새로운 음식점',
  });

  const $enrollForm = createRestaurantEnrollForm(
    restaurantInput,
    (event) => {
      const isValidate = RestaurantValidator.validate(restaurantInput);
      if (!isValidate) return;

      updateRestaurantList(restaurantInput);
      modal.toggle();
    },
    () => modal.toggle()
  );

  const fragment = new DocumentFragment();
  fragment.append($modalTitle, $enrollForm);

  modal.appendModalContent(fragment);

  return modal;
}

export default createRestaurantEnrollModal;
