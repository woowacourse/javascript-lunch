import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Category, SortOrder } from '../../enum/enums';
import { RestaurantData } from '../../type/types';
import { $ } from '../../util/domSelector';

export default class AppController {
  private sortOrder: SortOrder;
  private category: Category | '전체';
  private restaurantService: RestaurantService;

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

  private addEvent() {
    $('nav-bar').addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('select-box-section').addEventListener('changeCategory', this.changeCategory.bind(this));
    $('select-box-section').addEventListener('changeSortOrder', this.changeSortOrder.bind(this));
    $('add-restaurant-modal').addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  private changeCategory(event: Event) {
    const category: Category = (event as CustomEvent).detail;
    this.category = category;
    this.refreshRestaurantList();
  }

  private changeSortOrder(event: Event) {
    const sortOrder: SortOrder = (event as CustomEvent).detail;
    this.sortOrder = sortOrder;
    this.refreshRestaurantList();
  }

  private addRestaurant(event: Event) {
    const detail: RestaurantData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  private refreshRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    $('#app').removeChild($('restaurant-list')!);
    const restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortOrder, category));
    $('#app').appendChild(restaurantList);
  }

  private showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal').showModal();
  }
}
