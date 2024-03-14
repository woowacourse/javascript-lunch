import '../style.css';
import '../modal/AddRestaurantModal/AddRestaurantModal';
import '../root/NavigationBar/NavigationBar';
import '../root/RestaurantListFilter/RestaurantListFilter';
import '../root/RestaurantItem/RestaurantItem';

import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Category, SortOrder } from '../../enum/enums';
import { RestaurantDataType } from '../../type/restaurantDataType';
import { $ } from '../../util/domSelector';

export default class AppController {
  private sortOrder: SortOrder;
  private category: Category | '';
  private restaurantService: RestaurantService;
  private restaurantList: RestaurantList;

  constructor() {
    this.sortOrder = SortOrder.이름순;
    this.category = '';
    this.restaurantService = new RestaurantService();
    this.restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortOrder));
  }

  initializeApp() {
    this.addEvent();
    this.showRestaurantList();
  }

  private addEvent() {
    $('nav-bar').addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('restaurant-list-filter').addEventListener('changeCategory', this.changeCategory.bind(this));
    $('restaurant-list-filter').addEventListener('changeSortOrder', this.changeSortOrder.bind(this));
    $('add-restaurant-modal').addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  private changeCategory(event: Event) {
    if (event instanceof CustomEvent) {
      const category: Category = event.detail;
      this.category = category;
      this.updateRestaurantList();
    }
  }

  private changeSortOrder(event: Event) {
    if (event instanceof CustomEvent) {
      const sortOrder: SortOrder = event.detail;
      this.sortOrder = sortOrder;
      this.updateRestaurantList();
    }
  }

  private addRestaurant(event: Event) {
    if (event instanceof CustomEvent) {
      const detail: RestaurantDataType = event.detail;
      this.restaurantService.addRestaurant(detail);
      this.updateRestaurantList();
    }
  }

  private showRestaurantList() {
    $('#app').appendChild(this.restaurantList);
  }

  private updateRestaurantList() {
    const category = this.category === '' ? undefined : this.category;
    const newRestaurantList = this.restaurantService.getRestaurants(this.sortOrder, category);
    this.restaurantList.updateRestaurantList(newRestaurantList);
  }

  private showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal').showModal();
  }
}
