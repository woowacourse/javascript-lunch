import '@/css/index.css';
import RestaurantList from './RestaurantList/RestaurantList';
import { Category, SortCriteria } from '@/types/Restaurant';
import FilterContainer from './FilterContainer/FilterContainer';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import restaurantListMock from '@/mock/restaurantList.mock';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';
import { Thenable } from 'cypress/types/bluebird';
import Tab from './Tab';

class MainApp extends HTMLDivElement {
  #myTab: Tab;
  #newRestaurantModal: NewRestaurantModal;
  #restaurantDBService: RestaurantDBService;
  #allRestaurantApp: AllRestaurantApp;
  #favoriteRestaurantApp: FavoriteRestaurantApp;

  observedAttributes = [];

  constructor() {
    super();
    this.className = 'main-app-new';
    this.innerHTML = `
    <div is="my-tab" class="restaurant-nav-tab" style="margin-top:22px;"> 
    <div is="on-off-button" class="text-subtitle" checked="on" data-id="all">모든 음식점</div>
    <div is="on-off-button" class="text-subtitle" data-id="favorite">자주 가는 음식점</div>
    </div>
    <div is="all-restaurant-app" class="hidden" data-id="all"></div>
    <div is="favorite-restaurant-app" class="" data-id="favorite"></div>
    <div is="new-restaurant-modal" class="modal"></div>
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
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
