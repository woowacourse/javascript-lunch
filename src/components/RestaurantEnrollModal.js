import { CATEGORY_KEY } from '../../public/restaurantData.js';
import createElement from '../utils/createElement.js';
import RestaurantValidator from '../validators/RestaurantValidator.js';
import Modal from './common/Modal.js';
import createRestaurantEnrollForm from './RestaurantEnrollForm.js';
import { addRestaurantList } from './RestaurantList.js';

function handleClose(input) {
  document.querySelector('select#category').value = '';
  document.querySelector('input#name').value = '';
  document.querySelector('select#distance').value = '';
  document.querySelector('textarea#description').value = '';
  document.querySelector('input#link').value = '';

  Object.keys(input).forEach((key) => {
    input[key] = null;
  });
}

function createRestaurantEnrollModal() {
  const restaurantInput = {
    name: null,
    category: null,
    distance: null,
    description: null,
    link: null,
  };

  const modal = new Modal(() => handleClose(restaurantInput));

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

      addRestaurantList(restaurantInput);
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
