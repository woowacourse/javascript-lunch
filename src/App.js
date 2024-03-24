import { $, $$ } from './utils/querySelector';
import createFilteringBar from './components/FilteringBar/FilteringBar';
import createHeader from './components/Header/Header';
import AddRestaurantModal from './components/Modal/AddRestaurantModal';
import RestaurantDetailModal from './components/Modal/RestaurantDetailModal';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import createTabMenu from './components/TabMenu/TabMenu';
import { DEFAULT_FILTERING_CATEGORY, DEFAULT_SORTING_PROPERTY, DEFAULT_TAB, TAB_MENUS } from './constant/constants';
import RestaurantService from './domain/services/RestaurantService';

class App {
  #restaurantService = new RestaurantService();
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
    this.setTabEvents();

    this.renderRestaurantList();
  }

  setAddRestaurantModalEvents() {
    const addRestaurantForm = $('#add-restaurant');
    const cancelButton = $('#cancel');

    addRestaurantForm.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.#addRestaurantModal.createRestaurant();

      if (this.#restaurantService.isExistingRestaurant(newRestaurant)) {
        return alert('중복된 식당입니다. 다시 입력해주세요.');
      }

      this.#restaurantService.addRestaurant(newRestaurant);
      alert('추가되었습니다.');

      this.renderRestaurantList();
      addRestaurantForm.reset();
      this.#addRestaurantModal.toggle();
    });

    cancelButton.addEventListener('click', () => {
      this.#addRestaurantModal.toggle();
    });
  }

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

  renderRestaurantList() {
    const renderingList = this.#restaurantService.generateRenderingList(
      this.#activeTab,
      this.#filterCategory,
      this.#sortProperty,
    );

    if (renderingList.length === 0) {
      this.renderEmptyListMessage();
      return;
    }

    const restaurantUl = document.createElement('ul');
    restaurantUl.classList.add('restaurant-list');

    renderingList.forEach(restaurantItem => {
      restaurantUl.append(
        createRestaurantItem({
          restaurant: restaurantItem,
          onClick: () => this.restaurantItemClickHandler(restaurantItem),
          onToggle: id => this.restaurantItemFavoriteToggleHandler(id),
        }),
      );
    });

    const restaurantListContainer = $('.restaurant-list-container');
    restaurantListContainer.replaceChildren();
    restaurantListContainer.append(restaurantUl);
  }

  restaurantItemClickHandler(restaurantItem) {
    this.#restaurantDetailModal.draw({
      restaurant: restaurantItem,
      onDelete: id => {
        alert('삭제되었습니다!');
        this.#restaurantService.deleteRestaurant(id);
        this.renderRestaurantList();
        this.#restaurantDetailModal.toggle();
      },
      onToggle: id => {
        this.#restaurantService.updateFavoriteState(id);
      },
      onClose: () => {
        this.#restaurantDetailModal.toggle();
        this.renderRestaurantList();
      },
    });
    this.#restaurantDetailModal.toggle();
  }

  restaurantItemFavoriteToggleHandler(id) {
    this.#restaurantService.updateFavoriteState(id);
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
