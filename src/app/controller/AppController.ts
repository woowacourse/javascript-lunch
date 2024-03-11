import '../style.css';
import '../modal/AddRestaurantModal/AddRestaurantModal';
import '../root/NavigationBar/NavigationBar';
import '../root/SelectBoxSection/SelectBoxSection';
import '../root/RestaurantItem/RestaurantItem';

import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Category, SortOrder } from '../../enum/enums';
import { RestaurantData } from '../../type/types';
import { $ } from '../../util/domSelector';

export default class AppController {
  private sortOrder: SortOrder;
  private category: Category | '전체';
  private restaurantService: RestaurantService;
  private restaurantList: RestaurantList;

  constructor() {
    this.sortOrder = SortOrder.이름순;
    this.category = '전체';
    this.restaurantService = new RestaurantService();
    this.restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortOrder));
  }

  connectedCallback() {
    this.initializeApp();
  }

  initializeApp() {
    this.addEvent();
    this.showRestaurantList();
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
    this.updateRestaurantList();
  }

  private changeSortOrder(event: Event) {
    const sortOrder: SortOrder = (event as CustomEvent).detail;
    this.sortOrder = sortOrder;
    this.updateRestaurantList();
  }

  private addRestaurant(event: Event) {
    const detail: RestaurantData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.updateRestaurantList();
  }

  private showRestaurantList() {
    $('#app').appendChild(this.restaurantList);
  }

  private updateRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    const newRestaurantList = this.restaurantService.getRestaurants(this.sortOrder, category);
    this.restaurantList.updateRestaurantList(newRestaurantList);
  }

  private showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal').showModal();
  }
}
