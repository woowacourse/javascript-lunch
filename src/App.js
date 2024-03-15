import Dropdown from './components/Common/Dropdown';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import Modal from './components/Modal/Modal';
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
