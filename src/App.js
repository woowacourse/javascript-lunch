import Dropdown from './components/Common/Dropdown';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import createTabMenu from './components/TabMenu/TabMenu';
import { DEFAULT_TAB, TAB_MENUS } from './constant/constants';
import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from './constant/options';
import { $ } from './utils/querySelector';

const App = {
  initApp() {
    const addRestaurantModal = new AddRestaurantModal();
    addRestaurantModal.setEvents();

    createHeader({ title: '점심 뭐 먹지', buttonEvent: () => addRestaurantModal.toggle() });
    createTabMenu({ tabs: TAB_MENUS, defaultTab: DEFAULT_TAB });
    this.renderFilterDropdown();

    const restaurantList = document.createElement('ul');
    restaurantList.classList.add('restaurant-list');

    restaurantList.append(
      new createRestaurantItem({
        restaurant: {
          id: '친친',
          category: '중식',
          name: '친친',
          distance: 5,
        },
        onClick: e => {
          console.log(e.target);
        },
      }).element,
      new createRestaurantItem({
        restaurant: {
          id: '백소정',
          category: '일식',
          name: '백소정',
          distance: 15,
        },
        onClick: e => {
          console.log(e.target);
        },
      }).element,
    );

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.append(restaurantList);
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
