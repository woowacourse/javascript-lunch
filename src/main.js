import { createRestaurantList } from './components/RestaurantList.js';
import createSectionContainer from './components/SectionContainer.js';
import { RESTAURANT_ITEMS } from '../public/restaurantData.js';
import createRestaurantEnrollModal from './components/RestaurantEnrollModal.js';

const program = {
  enrollRestaurantModal: null,

  initUI() {
    const $main = document.getElementsByTagName('main')[0];

    const $filterContainer = createSectionContainer('restaurant-list-container');
    $filterContainer.appendChild(createRestaurantList(RESTAURANT_ITEMS));

    const $enrollRestaurantModal = createRestaurantEnrollModal();
    this.enrollRestaurantModal = $enrollRestaurantModal;

    $main.append($filterContainer, $enrollRestaurantModal.getElement());
  },

  initEvent() {
    const $openModalButton = document.querySelector('.gnb__button');

    $openModalButton.addEventListener('click', () => {
      this.enrollRestaurantModal.toggle();
    });

    const $backDrop = document.querySelector('.modal-backdrop');

    $backDrop.addEventListener('click', () => {
      this.enrollRestaurantModal.toggle();
    });
  },
};

program.initUI();
program.initEvent();
