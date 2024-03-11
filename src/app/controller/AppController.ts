import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { Sort, Category, LocationData } from '../../constants/typings';
import { $ } from '../../utils/domSelector';

class AppController {
  sort: Sort;
  category: Category | '전체';
  restaurantService: RestaurantService;

  constructor() {
    this.sort = '이름순';
    this.category = '전체';
    this.restaurantService = new RestaurantService();
  }

  initializeApp() {
    const category = this.category === '전체' ? undefined : this.category;
    const restaurantList: RestaurantList = new RestaurantList(
      this.restaurantService.getRestaurants(this.sort, category),
    );
    document.querySelector('#app')!.appendChild(restaurantList);
    this.addEvent();
  }

  addEvent() {
    $('lunch-header')!.addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    $('select-box-section')!.addEventListener('changeCategory', this.changeCategory.bind(this));
    $('select-box-section')!.addEventListener('changeSort', this.changeSort.bind(this));
    $('add-restaurant-modal')!.addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
  }

  changeCategory(event: Event) {
    const category: Category = (event as CustomEvent).detail;
    this.category = category;
    this.refreshRestaurantList();
  }

  changeSort(event: Event) {
    const sort: Sort = (event as CustomEvent).detail;
    this.sort = sort;
    this.refreshRestaurantList();
  }

  addRestaurant(event: Event) {
    const detail: LocationData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  refreshRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    $('#app')!.removeChild($('restaurant-list')!);
    const restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sort, category));
    $('#app')!.appendChild(restaurantList);
  }

  showAddRestaurantModal() {
    $<HTMLDialogElement>('#add-restaurant-modal')!.showModal();
  }
}

export default AppController;
