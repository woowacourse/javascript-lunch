import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';
import Tab from './Tab';
import RestaurantItemDetail from './RestaurantList/RestaurantItemDetail';
import BasicModal from './Basic/BasicModal';
import '@/css/index.css';
import './MainApp.css';
import { dom } from '@/util/dom';
import { IRestaurant } from '@/types/Restaurant';

class MainApp extends HTMLDivElement {
  #navTab: Tab;
  #allRestaurantApp: AllRestaurantApp;
  #favoriteRestaurantApp: FavoriteRestaurantApp;
  #newRestaurantModal: NewRestaurantModal;
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

    this.#navTab = dom.getElement<Tab>(this, 'div[is="my-tab"]');
    this.#newRestaurantModal = dom.getElement<NewRestaurantModal>(this, '.new-restaurant-modal');
    this.#allRestaurantApp = dom.getElement<AllRestaurantApp>(this, 'div[is="all-restaurant-app"]');
    this.#favoriteRestaurantApp = dom.getElement<FavoriteRestaurantApp>(
      this,
      'div[is="favorite-restaurant-app"]',
    );
    this.render();

    this.#navTab.addEventListener('click', () => {
      this.render();
    });

    this.#restaurantDetailModal = dom.getElement<BasicModal>(this, '.detail-modal');
    this.#restaurantDetailModal.appendAll([]);
  }

  render() {
    if (
      this.#allRestaurantApp ===
      this.querySelector(`.main-app-new > div[data-id="${this.#navTab.getSelected().dataset.id}"]`)
    ) {
      this.#favoriteRestaurantApp.classList.add('hidden');
      this.#allRestaurantApp.classList.remove('hidden');
      this.#allRestaurantApp.render();
    } else {
      this.#allRestaurantApp.classList.add('hidden');
      this.#favoriteRestaurantApp.classList.remove('hidden');
      this.#favoriteRestaurantApp.render();
    }
  }

  paintDetailModal(restaurant: IRestaurant) {
    this.#restaurantDetailModal.openModal();
    this.#restaurantDetailModal.replaceChildNodes([new RestaurantItemDetail(restaurant)]);
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
