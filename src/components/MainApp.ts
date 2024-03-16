import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';
import Tab from './Tab';
import RestaurantItemDetail from './RestaurantList/RestaurantItemDetail';
import BasicModal from './Basic/BasicModal/BasicModal';
import '@/css/index.css';
import './MainApp.css';

class MainApp extends HTMLDivElement {
  #myTab: Tab;
  #newRestaurantModal: NewRestaurantModal;
  #restaurantDBService: RestaurantDBService;
  #allRestaurantApp: AllRestaurantApp;
  #favoriteRestaurantApp: FavoriteRestaurantApp;
  #restaurantDetailModal: BasicModal;

  observedAttributes = [];

  constructor() {
    super();
    this.className = 'main-app-new';
    this.id = 'main-app';
    this.innerHTML = `
    <div is="my-tab" class="restaurant-nav-tab" style="margin-top:22px;"> 
    <div is="on-off-button" class="text-subtitle" checked="on" data-id="all">모든 음식점</div>
    <div is="on-off-button" class="text-subtitle" data-id="favorite">자주 가는 음식점</div>
    </div>

    <div is="all-restaurant-app" class="hidden" data-id="all"></div>
    <div is="favorite-restaurant-app" class="" data-id="favorite"></div>
  
    <div is="new-restaurant-modal" class="modal new-restaurant-modal"></div>

    <div is="basic-modal" class="modal basic-modal detail-modal" class-container="detail-modal__container" >
      <li is="restaurant-item-detail" class="restaurant-item-detail" style=""></li>
    </div>
    `;
    this.#myTab = this.querySelector('div[is="my-tab"]')!;
    this.#newRestaurantModal = this.querySelector('.modal')!;
    this.#restaurantDBService = new RestaurantDBService();
    this.#allRestaurantApp = this.querySelector('div[is="all-restaurant-app"]') as AllRestaurantApp;
    this.#favoriteRestaurantApp = this.querySelector(
      'div[is="favorite-restaurant-app"]',
    ) as FavoriteRestaurantApp;
    this.paint();

    this.#myTab.addEventListener('click', () => {
      this.paint();
    });

    this.#restaurantDetailModal = this.querySelector('.detail-modal') as BasicModal;
    this.#restaurantDetailModal.appendAll([]);
  }

  paint() {
    if (
      this.#allRestaurantApp ===
      this.querySelector(`.main-app-new > div[data-id="${this.#myTab.getSelected().dataset.id}"]`)
    ) {
      this.#favoriteRestaurantApp.classList.add('hidden');
      this.#allRestaurantApp.classList.remove('hidden');
      this.#allRestaurantApp.paint();
    } else {
      this.#allRestaurantApp.classList.add('hidden');
      this.#favoriteRestaurantApp.classList.remove('hidden');
      this.#favoriteRestaurantApp.paint();
    }
  }

  paintDetailModal(restaurant: any) {
    this.#restaurantDetailModal.openModal();
    this.#restaurantDetailModal.replaceChildNodes([new RestaurantItemDetail(restaurant)]);
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
