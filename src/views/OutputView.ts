import AddRestaurant from '../components/Modal/AddRestaurant';
import RestaurantComponent from '../components/Restaurant/RestaurantComponent';
import { Restaurant } from '../interface/RestaurantInterfaces';
import { $ } from '../utils/querySelector';

const OutputView = {
  renderRestaurantList(restaurantList: Restaurant[]) {
    const restaurantListContainer = $('.restaurant-list-container');
    if (!restaurantListContainer) return;

    const restaurantListElement = document.createElement('ul');
    restaurantListElement.classList.add('restaurant-list');

    restaurantList.forEach((restaurant: Restaurant) => {
      restaurantListElement.insertAdjacentHTML('beforeend', RestaurantComponent(restaurant));
    });

    restaurantListContainer.append(restaurantListElement);
  },

  renderAddRestaurant() {
    const modalContainer = $('.modal-container');
    if (!modalContainer) return;

    const newNode = AddRestaurant();
    modalContainer.innerHTML = newNode;

    this.openModal();
  },

  openModal() {
    const modal = $('.modal');
    if (!modal) return;

    modal.classList.add('modal--open');
  },

  closeModal() {
    const modal = $('.modal');
    if (!modal) return;

    modal.classList.remove('modal--open');
  },
};

export default OutputView;
