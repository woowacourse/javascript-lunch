import { restaurantService } from '.';
import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';

class App {
  constructor($root) {
    this.$header = new Header($root);
    this.$restaurantList = new RestaurantList(
      $root.querySelector('.restaurant-list-container'),
      restaurantService.getRestaurant(),
    );
    this.$filter = new Filters(
      $root.querySelector('.restaurant-filter-container'),
      this.$restaurantList,
    );
    this.$restaurantForm = new RestaurantForm(
      document.querySelector('#modal-container'),
      this.$restaurantList,
    );
  }

  init() {
    this.$header.render();
    this.$header.bindEvents();
    this.$filter.render();
    this.$filter.bindEvents();
    this.$restaurantList.render();
    this.$restaurantForm.render();
    this.$restaurantForm.bindEvents();
  }
}

export default App;
