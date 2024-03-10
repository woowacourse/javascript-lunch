import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Category, SortOrder } from '../../enum/enums';
import { RestaurantData } from '../../type/types';
import { $ } from '../../util/domSelector';

export default class AppController {
  sortOrder: SortOrder;
  category: Category | '전체';
  restaurantService: RestaurantService;

  constructor() {
    this.sortOrder = SortOrder.이름순;
    this.category = '전체';
    this.restaurantService = new RestaurantService();
  }

  initializeApp() {
    const category = this.category === '전체' ? undefined : this.category;
    const restaurantList: RestaurantList = new RestaurantList(
      this.restaurantService.getRestaurants(this.sortOrder, category),
    );
    $('#app').appendChild(restaurantList);
    this.addEvent();
  }

  addEvent() {
    $('nav-bar').addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('select-box-section').addEventListener('changeCategory', this.changeCategory.bind(this));
    $('select-box-section').addEventListener('changeSortOrder', this.changeSortOrder.bind(this));
    $('add-restaurant-modal').addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  changeCategory(event: Event) {
    const category: Category = (event as CustomEvent).detail;
    this.category = category;
    this.refreshRestaurantList();
  }

  changeSortOrder(event: Event) {
    const sortOrder: SortOrder = (event as CustomEvent).detail;
    this.sortOrder = sortOrder;
    this.refreshRestaurantList();
  }

  addRestaurant(event: Event) {
    const detail: RestaurantData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  refreshRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    $('#app').removeChild($('restaurant-list')!);
    const restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortOrder, category));
    $('#app').appendChild(restaurantList);
  }

  showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal').showModal();
  }
}
