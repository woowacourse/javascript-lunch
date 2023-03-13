import Header from './components/Header';
import RestaurantFilterBar from './components/RestaurantFilterBar';
import RestaurantListSection from './components/RestaurantListSection';
import { Restaurant } from './type/Restaurant';
import { FilterCategory, RestaurantList, SortCondition } from './domain/RestaurantList';
import RestaurantAddModal from './components/RestaurantAddModal';
import { RestaurantLocalStorage } from './domain/RestaurantLocalStorage';
import RestaurantDetailModal from './components/RestaurantDetailModal';
import { Component } from './type/Component';

class App implements Component {
  $target: Element;
  private restaurantList: RestaurantList;
  private components: {
    header: Header;
    filterBar: RestaurantFilterBar;
    listSection: RestaurantListSection;
    addModal: RestaurantAddModal;
    detailModal: RestaurantDetailModal;
  };

  constructor(parent: HTMLElement) {
    this.$target = document.createElement('main');
    parent.insertAdjacentElement('beforeend', this.$target);
    this.restaurantList = new RestaurantList(RestaurantLocalStorage.loadList('restaurantList'));
    this.components = {
      header: new Header(parent),
      filterBar: new RestaurantFilterBar(this.$target),
      listSection: new RestaurantListSection(
        this.$target,
        this.getRestaurantList({ category: '전체', sortCondition: '이름' }),
      ),
      addModal: new RestaurantAddModal(this.$target, this.restaurantList.validateRestaurant),
      detailModal: new RestaurantDetailModal(this.$target),
    };
  }

  init() {
    this.render();
    this.renderAllTab();

    this.components.header.setEventHandler(
      'addButton',
      this.components.addModal.show.bind(this.components.addModal),
    );
    this.components.header.setEventHandler('allTab', this.renderAllTab.bind(this));
    this.components.header.setEventHandler('favoriteTab', this.renderFavoriteTab.bind(this));
    this.components.filterBar.setEventHandler('filter', this.renderAllTab.bind(this));
    this.components.addModal.setEventHandler('addButton', this.addRestaurant.bind(this));
    this.components.addModal.setCloseModalHandler();
  }

  render(): void {
    this.components.header.render();
    this.components.filterBar.render();
    this.components.listSection.render();
    this.components.addModal.render();
    this.components.detailModal.render();
  }

  renderAllTab() {
    this.components.filterBar.show();
    this.components.listSection.setRestaurants(
      this.getRestaurantList({
        category: this.components.filterBar.getCategory(),
        sortCondition: this.components.filterBar.getSortCondition(),
      }),
    );
    this.components.listSection.reRender();

    this.components.listSection.setFavoriteButtonHandler(this.toggleIsFavorite.bind(this));
    this.components.listSection.setRestaurantClickHandler(this.renderDetailModal.bind(this));
  }

  renderFavoriteTab() {
    this.components.filterBar.hide();
    this.components.listSection.setRestaurants(this.getFavoriteList());
    this.components.listSection.reRender();

    this.components.listSection.setFavoriteButtonHandler(this.toggleIsFavorite.bind(this));
    this.components.listSection.setRestaurantClickHandler(this.renderDetailModal.bind(this));
  }

  renderDetailModal(restaurant: Restaurant) {
    this.components.detailModal.setRestaurant(restaurant);
    this.components.detailModal.reRender();

    this.components.detailModal.setEventHandler('favoriteButton', this.toggleIsFavorite.bind(this));
    this.components.detailModal.setEventHandler('deleteButton', this.deleteRestaurant.bind(this));
    this.components.detailModal.setCloseModalHandler();
    this.components.detailModal.show();
  }

  getRestaurantList(condition: { category: FilterCategory; sortCondition: SortCondition }) {
    switch (condition.sortCondition) {
      case '이름':
        return this.restaurantList.sortByName(
          this.restaurantList.getByCategory(condition.category),
        );
      case '거리':
        return this.restaurantList.sortByDistance(
          this.restaurantList.getByCategory(condition.category),
        );
    }
  }

  getFavoriteList() {
    return this.restaurantList.getFavoriteList();
  }

  addRestaurant(restaruant: Restaurant) {
    this.restaurantList.add(restaruant);
    RestaurantLocalStorage.saveList(
      'restaurantList',
      this.getRestaurantList({ category: '전체', sortCondition: '이름' }),
    );

    this.renderAllTab();
  }

  deleteRestaurant(name: string) {
    this.restaurantList.delete(name);
    RestaurantLocalStorage.saveList(
      'restaurantList',
      this.getRestaurantList({ category: '전체', sortCondition: '이름' }),
    );

    this.renderAllTab();
  }

  toggleIsFavorite(name: string) {
    this.restaurantList.toggleFavorite(name);
    RestaurantLocalStorage.saveList(
      'restaurantList',
      this.getRestaurantList({ category: '전체', sortCondition: '이름' }),
    );
  }
}

export default App;
