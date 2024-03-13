import AddRestaurantModal from '../components/Modal/AddRestaurantModal';
import RestaurantItem from '../components/Restaurant/RestaurantItem';
import { $ } from '../utils/querySelector';

const OutputView = {
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
