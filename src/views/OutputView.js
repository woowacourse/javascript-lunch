import AddRestaurant from '../components/Modal/AddRestaurant';
import RestaurantComponent from '../components/Restaurant/RestaurantComponent';
import { $ } from '../utils/querySelector';

const OutputView = {
  renderRestaurantList(restaurantList) {
    const restaurantListContainer = $('.restaurant-list-container');

    const restaurantListElement = document.createElement('ul');
    restaurantListElement.classList.add('restaurant-list');

    restaurantList.forEach(restaurant => {
      restaurantListElement.insertAdjacentHTML('beforeend', RestaurantComponent(restaurant));
    });
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantListElement);
  },

  renderAddRestaurant() {
    const modalContainer = $('.modal-container');

    const newNode = AddRestaurant();
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
