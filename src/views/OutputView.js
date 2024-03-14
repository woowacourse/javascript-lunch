import AddRestaurantModal from '../components/Modal/AddRestaurantModal';
import DetailRestaurantModal from '../components/Modal/DetailRestaurantModal';
import RestaurantItem from '../components/Restaurant/RestaurantItem';
import { $ } from '../utils/querySelector';
import Dropdown from '../components/Common/Dropdown';
import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../constant/options';

const OutputView = {
  renderFilterDropdown() {
    const filterContainer = $('.restaurant-filter-container');

    const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
    const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

    filterContainer.insertAdjacentHTML('beforeend', filterDropdown);
    filterContainer.insertAdjacentHTML('beforeend', sortDropdown);
  },

  renderRestaurantList(restaurantList) {
    const restaurantListContainer = $('.restaurant-list-container');

    const restaurantListElement = document.createElement('ul');
    restaurantListElement.classList.add('restaurant-list');

    restaurantList.forEach(restaurant => {
      restaurantListElement.insertAdjacentHTML('beforeend', RestaurantItem(restaurant));
    });

    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantListElement);
  },

  renderAddRestaurant() {
    const modalContainer = $('.modal-container');

    const newNode = AddRestaurantModal();
    modalContainer.innerHTML = newNode;

    this.openModal();
  },

  renderDetailRestaurant(restaurant) {
    const modalContainer = $('.modal-container');

    const newNode = DetailRestaurantModal(restaurant);
    modalContainer.innerHTML = newNode;

    this.openModal();
  },

  openModal() {
    const modal = $('.modal');
    modal.classList.add('modal--open');
  },

  closeModal() {
    const modal = $('.modal');
    modal.classList.remove('modal--open');
  },
};

export default OutputView;
