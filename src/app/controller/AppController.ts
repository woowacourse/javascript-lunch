import '../style.css';
import '../modal/AddRestaurantModal/AddRestaurantModal';
import '../root/NavigationBar/NavigationBar';
import '../root/RestaurantListTab/RestaurantListTab';
import '../root/RestaurantItem/RestaurantItem';

import RestaurantService from '../../service/RestaurantService';
import RestaurantListFilter from '../root/RestaurantListFilter/RestaurantListFilter';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Category, SortOrder, Tab } from '../../enum/enums';
import { RestaurantDataType } from '../../type/restaurantDataType';
import { $ } from '../../util/domSelector';

export default class AppController {
  private sortOrder: SortOrder;
  private category: Category | '';
  private tab: Tab;
  private restaurantService: RestaurantService;
  private restaurantListFilter: RestaurantListFilter;
  private restaurantList: RestaurantList;

  constructor() {
    this.sortOrder = SortOrder.이름순;
    this.category = '';
    this.tab = Tab['모든 음식점'];
    this.restaurantService = new RestaurantService();
    this.restaurantListFilter = new RestaurantListFilter();
    this.restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sortOrder));
  }

  initializeApp() {
    this.addEvent();
    this.showRestaurantList();
    $('restaurant-list-filter').addEventListener('changeCategory', this.changeCategory.bind(this));
    $('restaurant-list-filter').addEventListener('changeSortOrder', this.changeSortOrder.bind(this));
  }

  private addEvent() {
    $('nav-bar').addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('restaurant-list-tab').addEventListener('changeTab', this.changeTab.bind(this));
    $('add-restaurant-modal').addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  private changeTab(event: Event) {
    if (event instanceof CustomEvent) {
      const changedTab: Tab = event.detail;
      this.tab = Tab[changedTab];
    }
    this.updateRestaurantList();
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
    $('#restaurant-list').appendChild(this.restaurantListFilter);
    $('#restaurant-list').appendChild(this.restaurantList);
  }

  private updateRestaurantList() {
    const category = this.category === '' ? undefined : this.category;
    const isFavoriteList = this.tab === Tab['자주 가는 음식점'];
    const restaurantList = isFavoriteList
      ? this.restaurantService.getFavoriteRestaurants()
      : this.restaurantService.getRestaurants(this.sortOrder, category);
    this.toggleRestaurantListFilter();
    this.restaurantList.updateRestaurantList(restaurantList);
  }

  private toggleRestaurantListFilter() {
    if (this.tab === Tab['자주 가는 음식점']) {
      this.restaurantListFilter.hide();
      return;
    }
    this.restaurantListFilter.show();
  }

  private showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal').showModal();
  }
}
