import Header from './components/Header';
import Tab from './components/Tab';
import Filters from './components/Filters';
import RestaurantList from './components/RestaurantList';
import FavoriteList from './components/FavoriteList';
import RestaurantForm from './components/RestaurantForm';
import RestaurantInfo from './components/RestaurantInfo';

class App {
  constructor($root) {
    this.$root = $root;

    const $ = (selector) => this.$root.querySelector(selector);

    this.header = new Header($('.gnb'));
    this.tab = new Tab($('#tab-menu'));
    this.filters = new Filters($('.restaurant-filter-container'));
    this.restaurantList = new RestaurantList($('.restaurant-list-container'));
    this.favoriteList = new FavoriteList($('.restaurant-favorite-container'));
    this.restaurantForm = new RestaurantForm($('#modal-form'));
    this.restaurantInfo = new RestaurantInfo($('#modal-info'));
  }

  init() {
    this.header.mount();
    this.tab.inject(this.restaurantList, this.favoriteList).mount();
    this.filters.inject(this.restaurantList).mount();
    this.restaurantList.inject(this.favoriteList, this.restaurantInfo).mount();
    this.favoriteList.inject(this.restaurantInfo).mount();
    this.restaurantForm.inject(this.restaurantList).mount();
    this.restaurantInfo.inject(this.restaurantList, this.favoriteList);
  }
}

export default App;
