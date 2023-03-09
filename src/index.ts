import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import NavBar from './components/NavBar';
import DetailBottomSheet from './components/DetailBottomSheet';
import Store from './store';
import { $ } from './utils/dom';
import { CategoryFilter, Restaurant, SortFilter } from './types';
import './styles';

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);
customElements.define('nav-bar', NavBar);
customElements.define('detail-bottom-sheet', DetailBottomSheet);

class App {
  header: Header;
  modal: Modal;
  selectBox: SelectBox;
  restaurantItems: RestaurantItems;
  store: Store;
  detailBottomSheet: DetailBottomSheet;

  constructor() {
    this.header = $<Header>('lunch-header');
    this.modal = $<Modal>('add-modal');
    this.selectBox = $<SelectBox>('select-box');
    this.restaurantItems = $<RestaurantItems>('restaurant-items');
    this.detailBottomSheet = $<DetailBottomSheet>('detail-bottom-sheet');
    this.store = new Store();

    this.initHandler();
    this.restaurantItems.render(this.store.restaurants);
  }

  initHandler() {
    this.header.addModalHandler(this.openModalButtonHandler);
    this.selectBox.addSelectBoxHandler(this.selectBoxHandler);
    this.modal.addRestaurantHandler(this.restaurantHandler);
    this.restaurantItems.addBottomSheetHandler(this.openDetailBottomSheetHandler);
    this.detailBottomSheet.addDeleteHandler(this.deleteRestaurantHandler);
    this.store.initRestaurants();
  }

  openModalButtonHandler = () => {
    this.modal.openModal();
  };

  selectBoxHandler = (categoryFilter: CategoryFilter, sortFilter: SortFilter) => {
    this.store.filterRestaurants(categoryFilter);
    this.store.sortRestaurants(sortFilter);
    this.restaurantItems.render(this.store.renderedRestaurants);
  };

  restaurantHandler = (restaurant: Restaurant) => {
    this.store.addRestaurants(restaurant);
    this.restaurantItems.render(this.store.renderedRestaurants);
  };

  openDetailBottomSheetHandler = (restaurant: Restaurant) => {
    this.detailBottomSheet.render(restaurant);
    this.detailBottomSheet.toggle();
  };

  deleteRestaurantHandler = (name: string) => {
    this.store.deleteRestaurant(name);
    this.restaurantItems.render(this.store.renderedRestaurants);
  };
}

export default App;
new App();
