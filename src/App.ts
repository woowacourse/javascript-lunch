import Header from './components/Header';
import RestaurantBlock from './components/RestaurantBlock';
import RestaurantBlockList from './components/RestaurantBlockList';
import RestaurantFilter from './components/RestaurantFilterBar';
import { Restaurant } from './type/Restaurant';
import { FilterCategory, RestaurantList, SortCondition } from './domain/RestaurantList';
import RestaurantAddModal from './components/RestaurantAddModal';
import { RestaurantLocalStorage } from './domain/RestaurantLocalStorage';

class App {
  private restaurantsList: RestaurantList = new RestaurantList(
    RestaurantLocalStorage.loadList('restaurantList'),
  );

  constructor(target: HTMLElement) {
    Header.render(target);
    RestaurantFilter.render(target);
    RestaurantBlockList.render(target);
    RestaurantAddModal.render(target);

    this.setEvent();
    this.renderList('전체', '이름');
  }

  setEvent = () => {
    Header.setButtonHandler(RestaurantAddModal.toggle);
    RestaurantFilter.setSelectChangeHandler(this.renderList);
    RestaurantAddModal.setCloseModalHandler();
    RestaurantAddModal.setAddbuttonHandler(this.addRestaurant);
  };

  renderList = (category: FilterCategory, sortCondition: SortCondition) => {
    RestaurantBlockList.replaceList(
      this.restaurantsList
        .getList(category, sortCondition)
        .map((restaurant) => new RestaurantBlock(restaurant)),
    );
  };

  addRestaurant = (restaruant: Restaurant) => {
    this.restaurantsList.add(restaruant);
    RestaurantLocalStorage.saveList('restaurantList', this.restaurantsList.getList('전체', '이름'));

    this.renderList(RestaurantFilter.category, RestaurantFilter.sortCondition);
  };
}

export default App;
