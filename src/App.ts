import Header from './components/Header';
import RestaurantFilterBar from './components/RestaurantFilterBar';
import RestaurantListSection from './components/RestaurantListSection';
import { Restaurant } from './type/Restaurant';
import { FilterCategory, RestaurantList, SortCondition } from './domain/RestaurantList';
import RestaurantAddModal from './components/RestaurantAddModal';
import { RestaurantLocalStorage } from './domain/RestaurantLocalStorage';
import RestaurantDetailModal from './components/RestaurantDetailModal';

class App {
  private restaurantList: RestaurantList;
  private components: {
    header: Header;
    filterBar: RestaurantFilterBar;
    listSection: RestaurantListSection;
    addModal: RestaurantAddModal;
    detailModal: RestaurantDetailModal;
  };

  constructor(target: HTMLElement) {
    this.restaurantList = new RestaurantList(RestaurantLocalStorage.loadList('restaurantList'));
    this.components = {
      header: new Header(target),
      filterBar: new RestaurantFilterBar(target),
      listSection: new RestaurantListSection(target, this.getRestaurantList('전체', '이름')),
      addModal: new RestaurantAddModal(target, this.restaurantList.validateRestaurant),
      detailModal: new RestaurantDetailModal(target),
    };

    this.init();
  }

  init = () => {
    this.renderAllTab();
    this.components.header.setButtonHandler(this.components.addModal.show);
    this.components.header.setTabHandler(this.renderAllTab, this.renderFavoriteTab);
    this.components.filterBar.setSelectChangeHandler(this.renderAllTab);
    this.components.addModal.setAddbuttonHandler(this.addRestaurant);
    this.components.addModal.setCloseModalHandler();
  };

  renderAllTab = () => {
    this.components.filterBar.show();
    this.components.listSection.setRestaurants(
      this.getRestaurantList(
        this.components.filterBar.getCategory(),
        this.components.filterBar.getSortCondition(),
      ),
    );
    this.components.listSection.render();

    this.components.listSection.setFavoriteButtonHandler(this.toggleFavoriteButton);
    this.components.listSection.setRestaurantClickHandler(this.renderDetailModal);
  };

  renderFavoriteTab = () => {
    this.components.filterBar.hide();
    this.components.listSection.setRestaurants(this.getFavoriteList());
    this.components.listSection.render();

    this.components.listSection.setFavoriteButtonHandler(this.toggleFavoriteButton);
    this.components.listSection.setRestaurantClickHandler(this.renderDetailModal);
  };

  renderDetailModal = (restaurant: Restaurant) => {
    this.components.detailModal.setRestaurant(restaurant);
    this.components.detailModal.render();

    this.components.detailModal.setCloseModalHandler();
    this.components.detailModal.setFavoriteButtonHandler(this.toggleFavoriteButton);
    this.components.detailModal.show();
  };

  getRestaurantList = (category: FilterCategory, condition: SortCondition) => {
    switch (condition) {
      case '이름':
        return this.restaurantList.sortByName(this.restaurantList.getByCategory(category));
      case '거리':
        return this.restaurantList.sortByDistance(this.restaurantList.getByCategory(category));
    }
  };

  getFavoriteList = () => this.restaurantList.getFavoriteList();

  addRestaurant = (restaruant: Restaurant) => {
    this.restaurantList.add(restaruant);
    RestaurantLocalStorage.saveList('restaurantList', this.getRestaurantList('전체', '이름'));

    this.renderAllTab();
  };

  toggleFavoriteButton = (name: string) => {
    this.restaurantList.toggleFavorite(name);
    RestaurantLocalStorage.saveList('restaurantList', this.getRestaurantList('전체', '이름'));
  };
}

export default App;
