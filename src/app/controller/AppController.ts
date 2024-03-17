import '../style.css';
import '../modal/RestaurantAddModal/RestaurantAddModal';
import '../root/NavigationBar/NavigationBar';
import '../root/RestaurantListTab/RestaurantListTab';
import '../root/RestaurantItem/RestaurantItem';

import RestaurantService from '../../service/RestaurantService';
import RestaurantListFilter from '../root/RestaurantListFilter/RestaurantListFilter';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import RestaurantAddModal from '../modal/RestaurantAddModal/RestaurantAddModal';
import RestaurantDetailModal from '../modal/RestaurantDetailModal/RestaurantDetailModal';
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
  private restaurantAddModal: RestaurantAddModal;
  private restaurantDetailModal: RestaurantDetailModal;

  constructor() {
    this.sortOrder = SortOrder.이름순;
    this.category = '';
    this.tab = Tab['모든 음식점'];
    this.restaurantService = new RestaurantService();
    this.restaurantListFilter = new RestaurantListFilter();
    this.restaurantList = new RestaurantList({
      restaurants: this.restaurantService.getRestaurants(this.sortOrder),
      onRestaurantClick: this.showRestaurantDetailModal.bind(this),
      onRestaurantFavorite: this.updateRestaurantFavorite.bind(this),
    });
    this.restaurantAddModal = new RestaurantAddModal({
      title: '음식점 추가하기',
      id: 'add-restaurant-modal',
      onSubmit: this.addRestaurant.bind(this),
    });
    this.restaurantDetailModal = new RestaurantDetailModal({
      id: 'restaurant-detail-modal',
      onDelete: this.deleteRestaurant.bind(this),
      onFavorite: this.updateRestaurantFavorite.bind(this),
    });
  }

  initializeApp() {
    this.initiateNavBar();
    this.initiateRestaurantListTab();
    this.initiateRestaurantListFilter();
    this.initiateRestaurantAddModal();
    this.initiateRestaurantDetailModal();
    this.initiateRestaurantList();
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

  private updateRestaurantFavorite(name: string, isFavorited: boolean) {
    this.restaurantService.updateRestaurantFavorite(name, isFavorited);
  }

  private initiateNavBar() {
    $('nav-bar').addEventListener('showRestaurantAddModal', this.showRestaurantAddModal.bind(this));
  }

  private initiateRestaurantListTab() {
    $('restaurant-list-tab').addEventListener('changeTab', this.changeTab.bind(this));
  }

  private initiateRestaurantListFilter() {
    this.restaurantListFilter.addEventListener('changeCategory', this.changeCategory.bind(this));
    this.restaurantListFilter.addEventListener('changeSortOrder', this.changeSortOrder.bind(this));
    $('#restaurant-list').appendChild(this.restaurantListFilter);
  }

  private initiateRestaurantList() {
    $('#restaurant-list').appendChild(this.restaurantList);
  }

  private initiateRestaurantAddModal() {
    document.body.appendChild(this.restaurantAddModal.render());
  }

  private initiateRestaurantDetailModal() {
    document.body.appendChild(this.restaurantDetailModal.render());
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

  private showRestaurantAddModal() {
    this.restaurantAddModal.showModal();
  }

  private showRestaurantDetailModal(restaurantData: RestaurantDataType) {
    this.restaurantDetailModal.showRestaurantDetail(restaurantData);
  }

  private addRestaurant(restaurantData: RestaurantDataType) {
    this.restaurantService.addRestaurant(restaurantData);
    this.updateRestaurantList();
  }

  private deleteRestaurant(restaurantName: string) {
    this.restaurantService.deleteRestaurant(restaurantName);
    this.updateRestaurantList();
  }
}
