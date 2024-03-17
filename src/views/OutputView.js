import AddRestaurantModal from '../components/AddRestaurantModal/AddRestaurantModal';
import DetailRestaurantModal from '../components/Restaurant/DetailRestaurantModal';
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

  renderDetailRestaurant(restaurant) {
    const modalContainer = $('.modal-container');

    const newNode = DetailRestaurantModal(restaurant);
    modalContainer.innerHTML = newNode;

    this.openModal();
  },
};

export default OutputView;
