import Dropdown from '../components/Common/Dropdown';
import RestaurantComponent from '../components/Restaurant/RestaurantComponent';
import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../constant/options';
import { $ } from '../utils/querySelector';

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
      const newRestaurant = new RestaurantComponent(restaurant);
      restaurantListElement.insertAdjacentHTML('beforeend', newRestaurant.render());
    });
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantListElement);
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
