import AddRestaurantModal from '../components/Modal/AddRestaurantModal';
import DetailRestaurantModal from '../components/Modal/DetailRestaurantModal';
import RestaurantItem from '../components/Restaurant/RestaurantItem';
import { $ } from '../utils/querySelector';

const OutputView = {
  renderRestaurantList(restaurantList) {
    const restaurantListContainer = $('.restaurant-list-container');

    const restaurantListElement = document.createElement('ul');
    restaurantListElement.classList.add('restaurant-list');

    restaurantList.forEach((restaurant, index) => {
      restaurantListElement.insertAdjacentHTML('beforeend', RestaurantItem(restaurant, index));
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
