import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { LocationData } from '../../constants/typings';
import { Category, Sort } from '../../constants/enums';
import { $ } from '../../utils/domSelector';

class AppController {
  //TODO: 컴포넌트에 따라 함수 분리하기
  sort: Sort;
  category: Category | '전체';
  restaurantService: RestaurantService;

  constructor() {
    this.sort = Sort.이름순;
    this.category = '전체';
    this.restaurantService = new RestaurantService();
  }

  initializeApp() {
    const category = this.category === '전체' ? undefined : this.category;
    const restaurantList: RestaurantList = new RestaurantList(
      this.restaurantService.getRestaurants(this.sort, category),
    );

    const appElement = document.querySelector('#app');
    if (appElement) {
      appElement.appendChild(restaurantList);
      this.addEvent();
    }
  }

  addEvent() {
    const lunchHeader = document.querySelector('lunch-header');
    if (lunchHeader) {
      lunchHeader.addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    }

    const selectBoxSection = document.querySelector('select-box-section');
    if (selectBoxSection) {
      selectBoxSection.addEventListener('changeCategory', this.changeCategory.bind(this));
      selectBoxSection.addEventListener('changeSort', this.changeSort.bind(this));
    }

    const addRestaurantModal = document.querySelector('add-restaurant-modal');
    if (addRestaurantModal) {
      addRestaurantModal.addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
    }
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
    //TODO: 여기에 Validation 연결하기
    const detail: LocationData = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  refreshRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    const appElement = $('#app');
    const oldRestaurantList = $('restaurant-list');
    if (appElement && oldRestaurantList) {
      appElement.removeChild(oldRestaurantList);
      const restaurantList = new RestaurantList(this.restaurantService.getRestaurants(this.sort, category));
      appElement.appendChild(restaurantList);
    }
  }

  showAddRestaurantModal() {
    const addResultModal = $<HTMLDialogElement>('#add-restaurant-modal');
    if (addResultModal) addResultModal.showModal();
  }
}

export default AppController;
