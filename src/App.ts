import Header from './components/Header';
import RestaurantFilterBar from './components/RestaurantFilterBar';
import RestaurantListSection from './components/RestaurantListSection';
import { Restaurant } from './type/Restaurant';
import { FilterCategory, RestaurantList, SortCondition } from './domain/RestaurantList';
import RestaurantAddModal from './components/RestaurantAddModal';
import { RestaurantLocalStorage } from './domain/RestaurantLocalStorage';

class App {
  private restaurantsList: RestaurantList;
  private components: {
    header: Header;
    filterBar: RestaurantFilterBar;
    listSection: RestaurantListSection;
    addModal: RestaurantAddModal;
  };

  constructor(target: HTMLElement) {
    this.restaurantsList = new RestaurantList(RestaurantLocalStorage.loadList('restaurantList'));
    this.components = {
      header: new Header(target),
      filterBar: new RestaurantFilterBar(target),
      listSection: new RestaurantListSection(target, this.getRestaurantsList('전체', '이름')),
      addModal: new RestaurantAddModal(target),
    };

    this.setEventHandler();
    this.renderList('전체', '이름');
  }

  setEventHandler = () => {
    this.components.header.setButtonHandler(this.components.addModal.toggle);
    this.components.filterBar.setSelectChangeHandler(this.renderList);
    this.components.addModal.setAddbuttonHandler(this.addRestaurant);
    this.components.addModal.setCloseModalHandler();
  };

  renderList = (category: FilterCategory, sortCondition: SortCondition) => {
    this.components.listSection.restaurants = this.getRestaurantsList(category, sortCondition);
    this.components.listSection.render();
  };

  getRestaurantsList = (category: FilterCategory, condition: SortCondition) => {
    switch (condition) {
      case '이름':
        return this.restaurantsList.sortByName(this.restaurantsList.getByCategory(category));
      case '거리':
        return this.restaurantsList.sortByDistance(this.restaurantsList.getByCategory(category));
    }
  };

  getFavoriteList = () => this.restaurantsList.getFavoriteList();

  addRestaurant = (restaruant: Restaurant) => {
    this.restaurantsList.add(restaruant);
    RestaurantLocalStorage.saveList('restaurantList', this.getRestaurantsList('전체', '이름'));

    this.renderList(
      this.components.filterBar.getCategory(),
      this.components.filterBar.getSortCondition(),
    );
  };
}

export default App;
