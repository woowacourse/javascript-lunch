import Dropdown from './components/Common/Dropdown';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import RestaurantList from './components/RestaurantList/RestaurantList';
import createTabMenu from './components/TabMenu/TabMenu';
import { DEFAULT_TAB, TAB_MENUS } from './constant/constants';
import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from './constant/options';
import { $ } from './utils/querySelector';

const App = {
  initApp() {
    const addRestaurantModal = new AddRestaurantModal();
    addRestaurantModal.setEvents();

    const restaurantDetailModal = new RestaurantDetailModal();

    const restaurantList = new RestaurantList();

    createHeader({ title: '점심 뭐 먹지', buttonEvent: () => addRestaurantModal.toggle() });
    createTabMenu({ tabs: TAB_MENUS, defaultTab: DEFAULT_TAB });
    this.renderFilterDropdown();

    const restaurantUl = document.createElement('ul');
    restaurantUl.classList.add('restaurant-list');

    restaurantList.list.map(restaurantItem => {
      restaurantUl.append(
        new createRestaurantItem({
          restaurant: restaurantItem,
          onClick: () => {
            restaurantDetailModal.restaurant = restaurantItem;
            restaurantDetailModal.toggle();
          },
        }).element,
      );
    });

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.append(restaurantUl);
  },

  renderFilterDropdown() {
    const filterContainer = $('.restaurant-filter-container');

    const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
    const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

    filterContainer.insertAdjacentHTML('beforeend', filterDropdown);
    filterContainer.insertAdjacentHTML('beforeend', sortDropdown);
  },
};

export default App;
