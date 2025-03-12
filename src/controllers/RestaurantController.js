import { RESTAURANT_DATA } from '../../public/restaurantData.js';
import createSectionContainer from '../components/common/SectionContainer.js';
import createRestaurantEnrollModal from '../components/RestaurantEnrollModal.js';
import { createRestaurantList } from '../components/RestaurantList.js';
import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantController {
  start() {
    const restaurantStorage = new RestaurantStorage();
    const restaurantList = new RestaurantList();

    const $main = document.getElementsByTagName('main')[0];

    const $listContainer = createSectionContainer('restaurant-list-container');
    $listContainer.appendChild(createRestaurantList(RESTAURANT_DATA));

    const $enrollRestaurantModal = createRestaurantEnrollModal();

    $main.append($listContainer, $enrollRestaurantModal.getElement());

    const $openModalButton = document.querySelector('.gnb__button');
    const $backDrop = document.querySelector('.modal-backdrop');

    $openModalButton.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });

    $backDrop.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });
  }
}

export default RestaurantController;
