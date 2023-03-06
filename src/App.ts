import Header from './components/Header';
import RestaurantBlock from './components/RestaurantBlock';
import RestaurantBlockList from './components/RestaurantBlockList';
import RestaurantFilter from './components/RestaurantFilterBar';
import { Restaurant } from './type/Restaurant';
import { FilterCategory, RestaurantList, SortCondition } from './domain/RestaurantList';
import RestaurantAddModal from './components/RestaurantAddModal';

class App {
  private restaurantsList: RestaurantList;

  constructor(target: HTMLElement) {
    this.restaurantsList = new RestaurantList();
    Header.render(target);
    RestaurantFilter.render(target);
    RestaurantBlockList.render(target);
    RestaurantAddModal.render(target);
  }

  init = (data: Restaurant[]) => {
    data.forEach((restaurant) => {
      this.restaurantsList.add(restaurant);
    });

    this.renderList('전체', '이름');
    this.setEvent();
  };

  setEvent = () => {
    RestaurantFilter.setSelectChangeHandler(this.renderList);
    Header.setButtonHandler(RestaurantAddModal.toggle);
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
    this.renderList(RestaurantFilter.category, RestaurantFilter.sortCondition);
  };
}

export default App;
