import { selectElement } from '../utils/dom.ts';

function openAddRestaurantModal() {
  const gnbButton = selectElement('.gnb__button');

  gnbButton.addEventListener('click', () => {
    const modal = selectElement('.add-restaurant-modal');
    modal.classList.add('modal--open');
  });
}

export default openAddRestaurantModal;
