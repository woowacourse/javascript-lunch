import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './FilterContainer/FilterContainer';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';

class MainAppNew extends HTMLDivElement {
  #newRestaurantModal: NewRestaurantModal;
  #restaurantDBService: RestaurantDBService;

  observedAttributes = [];

  constructor() {
    super();
    this.className = 'main-app-new';
    this.innerHTML = `
    <div is="my-tab" class="restaurant-nav-tab" style="margin-top:22px;"> 
    <div is="on-off-button" class="text-subtitle" checked="on">모든 음식점</div>
    <div is="on-off-button" class="text-subtitle">자주 가는 음식점</div>
    </div>
    <div is="all-restaurant-app" class="hidden"></div>
    <div is="favorite-restaurant-app" class=""></div>
    <div is="new-restaurant-modal" class="modal"></div>
    `;

    this.#newRestaurantModal = this.querySelector('.modal')!;
    this.#restaurantDBService = new RestaurantDBService();
    // (this.querySelector('div[is="favorite-restaurant-app"]') as FavoriteRestaurantApp).paint();
    // this.paint();
  }

  // paint() {
  //   this.#restaurantList.paint(this.#getNewRestaurantList());
  // }

  // #getNewRestaurantList() {
  //   const { category, sortCriteria } = this.#filterContainer.get();
  //   let newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
  //   if (!newRestaurantList) {
  //     this.#setMock();
  //     newRestaurantList = this.#getDB(category as Category, sortCriteria as SortCriteria);
  //   }
  //   return newRestaurantList;
  // }

  #setMock() {
    this.#restaurantDBService.set(restaurantListMock);
  }

  #getDB(category: Category, sortCriteria: SortCriteria) {
    return this.#restaurantDBService.getFromRestaurantList(category, sortCriteria);
  }
}

customElements.define('main-app-newa', MainAppNew, { extends: 'div' });

export default MainAppNew;
