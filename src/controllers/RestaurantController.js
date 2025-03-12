import { RESTAURANT_DATA } from '../../public/restaurantData.js';
import createSectionContainer from '../components/common/SectionContainer.js';
import createFilterGroup from '../components/FilterGroup.js';
import createRestaurantEnrollModal from '../components/RestaurantEnrollModal.js';
import { createRestaurantList } from '../components/RestaurantList.js';
import RestaurantList from '../domains/RestaurantList.js';
import RestaurantStorage from '../domains/RestaurantStorage.js';

class RestaurantController {
  start() {
    const restaurantStorage = new RestaurantStorage();
    const restaurantList = new RestaurantList();

    const $main = document.getElementsByTagName('main')[0];

    const $filterContainer = createSectionContainer('restaurant-filter-container');
    $filterContainer.appendChild(
      createFilterGroup(this.#handleChangeCategory, this.#handleChangeFilter)
    );

    const $listContainer = createSectionContainer('restaurant-list-container');
    $listContainer.appendChild(createRestaurantList(RESTAURANT_DATA, this.#handleClickStar));

    const $enrollRestaurantModal = createRestaurantEnrollModal();

    $main.append($filterContainer, $listContainer, $enrollRestaurantModal.getElement());

    const $openModalButton = document.querySelector('.gnb__button');
    const $backDrop = document.querySelector('.modal-backdrop');

    $openModalButton.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });

    $backDrop.addEventListener('click', () => {
      $enrollRestaurantModal.toggle();
    });
  }

  #handleClickStar(event) {
    event.target.classList.toggle('restaurant__star--clicked');
  }

  #handleChangeCategory(event) {
    console.log(event.target.value);
  }

  #handleChangeFilter(event) {
    console.log(event.target.value);
  }
}

export default RestaurantController;
