import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { SortType, Category, LocationData } from '../../constants/Type';
import { $ } from '../../utils/domSelector';

class AppController {
  sortType: SortType;
  category: Category | '전체';
  restaurantService: RestaurantService;

  constructor() {
    this.sortType = '이름순';
    this.category = '전체';
    this.restaurantService = new RestaurantService();
  }

  initializeApp() {
    const restaurantList: RestaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortType));
    document.querySelector('#app')!.appendChild(restaurantList);
    this.addEvent();
  }

  addEvent() {
    $('lunch-header')!.addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('add-restaurant-modal')!.addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  addRestaurant(event: Event) {
    const detail: LocationData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  refreshRestaurantList() {
    $('#app')!.removeChild($('restaurant-list')!);
    const restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortType));
    $('#app')!.appendChild(restaurantList);
  }

  showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal')!.showModal();
  }
}

export default AppController;
