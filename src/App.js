import createFilteringBar from './components/FilteringBar/FilteringBar';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import RestaurantList from './components/RestaurantList/RestaurantList';
import createTabMenu from './components/TabMenu/TabMenu';
import { DEFAULT_TAB, TAB_MENUS } from './constant/constants';
import { $, $$ } from './utils/querySelector';

class App {
  #addRestaurantModal = new AddRestaurantModal();
  #restaurantDetailModal = new RestaurantDetailModal();
  #restaurantList = new RestaurantList();

  initApp() {
    createHeader({ title: '점심 뭐 먹지', buttonEvent: () => this.#addRestaurantModal.toggle() });
    createTabMenu({ tabs: TAB_MENUS, defaultTab: DEFAULT_TAB });
    createFilteringBar();

    this.setTabEvents();

    this.renderRestaurantList();
  }

  setTabEvents() {
    const tabButtons = Array.from($$('.button--tabmenu'));
    tabButtons.forEach(tabButton => {
      tabButton.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('active')) return;

        tabButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');

        this.renderRestaurantList();
      });
    });
  }

  renderRestaurantList() {
    if (this.#restaurantList.list.length === 0) {
      this.renderEmptyListMessage();
      return;
    }

    const restaurantUl = document.createElement('ul');
    restaurantUl.classList.add('restaurant-list');

    this.#restaurantList.list.map(restaurantItem => {
      restaurantUl.append(
        new createRestaurantItem({
          restaurant: restaurantItem,
          onClick: () => {
            this.#restaurantDetailModal.restaurant = restaurantItem;
            this.#restaurantDetailModal.toggle();
          },
        }).element,
      );
    });

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantUl);
  }

  renderEmptyListMessage() {
    const messageElement = document.createElement('h3');
    messageElement.classList.add('empty--message');
    messageElement.textContent = '음식점 목록이 비어있습니다. 새로 추가해보세요!';

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(messageElement);
  }
}

export default App;
