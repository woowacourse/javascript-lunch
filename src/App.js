import createFilteringBar from './components/FilteringBar/FilteringBar';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import RestaurantList from './components/RestaurantList/RestaurantList';
import createTabMenu from './components/TabMenu/TabMenu';
import { DEFAULT_FILTERING_CATEGORY, DEFAULT_SORTING_PROPERTY, DEFAULT_TAB, TAB_MENUS } from './constant/constants';
import RestaurantService from './domain/services/RestaurantService';
import { $, $$ } from './utils/querySelector';

class App {
  #restaurantList = new RestaurantList();
  #addRestaurantModal = new AddRestaurantModal();
  #restaurantDetailModal = new RestaurantDetailModal();

  #activeTab;
  #filterCategory = DEFAULT_FILTERING_CATEGORY;
  #sortProperty = DEFAULT_SORTING_PROPERTY;

  initApp() {
    createHeader({ title: '점심 뭐 먹지', buttonEvent: () => this.#addRestaurantModal.toggle() });
    createTabMenu({ tabs: TAB_MENUS, defaultTab: DEFAULT_TAB });
    createFilteringBar({
      onCategoryChanged: item => {
        this.#filterCategory = item;
        this.renderRestaurantList();
      },
      onSortChanged: item => {
        this.#sortProperty = item;
        this.renderRestaurantList();
      },
    });

    this.setAddRestaurantModalEvents();
    this.setRestaurantDetailModalEvents();
    this.setTabEvents();

    this.renderRestaurantList();
  }

  setAddRestaurantModalEvents() {
    const addRestaurantForm = $('#add-restaurant');
    const cancelButton = $('#cancel');

    addRestaurantForm.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = RestaurantService.createRestaurant();

      const isAdded = RestaurantService.addRestaurant(newRestaurant, this.#restaurantList.list);
      const isAddedMessage = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedMessage);

      if (!isAdded) return;
      this.renderRestaurantList();
      addRestaurantForm.reset();
      this.#addRestaurantModal.toggle();
    });

    cancelButton.addEventListener('click', () => {
      this.#addRestaurantModal.toggle();
    });
  }

  setRestaurantDetailModalEvents() {}

  setTabEvents() {
    const tabButtons = Array.from($$('.button--tabmenu'));
    tabButtons.forEach(tabButton => {
      tabButton.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('active')) return;

        tabButtons.forEach(button => button.classList.remove('active'));
        e.target.classList.add('active');

        this.#activeTab = e.target.id;
        this.renderRestaurantList();
      });
    });
  }

  generateRenderingList() {
    const filteredItems = RestaurantService.filterByCategory(this.#filterCategory, this.#restaurantList.list);
    const sortedItems = RestaurantService.sortByProperty(this.#sortProperty, filteredItems);

    if (this.#activeTab === 'favorite') {
      return RestaurantService.filterFavorite(sortedItems);
    }
    return sortedItems;
  }

  renderRestaurantList() {
    const renderingList = this.generateRenderingList();

    if (renderingList.length === 0) {
      this.renderEmptyListMessage();
      return;
    }

    const restaurantUl = document.createElement('ul');
    restaurantUl.classList.add('restaurant-list');

    renderingList.map(restaurantItem => {
      restaurantUl.append(
        new createRestaurantItem({
          restaurant: restaurantItem,
          onClick: () => this.restaurantItemClickHandler(restaurantItem),
          onToggle: () => this.restaurantItemFavoriteToggleHandler(),
        }).element,
      );
    });

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantUl);
  }

  restaurantItemClickHandler(restaurantItem) {
    this.#restaurantDetailModal.restaurant = {
      restaurant: restaurantItem,
      deleteHandler: item => {
        alert('삭제되었습니다!');
        this.#restaurantList.list = RestaurantService.deleteRestaurant(item, this.#restaurantList.list);
        this.renderRestaurantList();
        this.#restaurantDetailModal.toggle();
      },
    };
    this.#restaurantDetailModal.toggle();
  }

  restaurantItemFavoriteToggleHandler() {
    this.#restaurantList.updateData();
    this.renderRestaurantList();
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
