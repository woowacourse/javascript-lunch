import '@/css/index.css';
import NewRestaurantModal from './NewRestaurantModal/NewRestaurantModal';
import RestaurantDBService from '@/domains/services/RestaurantDBService';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';
import Tab from './Tab';
import RestaurantItemDetail from './RestaurantList/RestaurantItemDetail';
import './MainApp.css';
import BasicModal from './Basic/BasicModal/BasicModal';
import FavoriteIcon from './Basic/FavoriteIcon';

class MainApp extends HTMLDivElement {
  #myTab: Tab;
  #newRestaurantModal: NewRestaurantModal;
  #restaurantDBService: RestaurantDBService;
  #allRestaurantApp: AllRestaurantApp;
  #favoriteRestaurantApp: FavoriteRestaurantApp;
  #restaurantItemDetail: RestaurantItemDetail;

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
  
    <div is="new-restaurant-modal" class="modal new-restaurant-modal"></div>

    <div is="basic-modal" class="modal basic-modal detail-modal modal--open" class-container="detail-modal__container" >
      <li is="restaurant-item-detail" class="restaurant-item-detail" style=""></li>
    </div>


    `; // <div is="restaurant-item-detail-modal" class="modal restaurant-detail-modal"></div>
    //  <div is="new-restaurant-modal" class="modal new-restaurant-modal"></div>
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

    console.log(this.querySelector('.restaurant-item-detail') as RestaurantItemDetail);
    this.#restaurantItemDetail = this.querySelector(
      '.restaurant-item-detail',
    ) as RestaurantItemDetail;
    this.#restaurantItemDetail.setState({
      name: '피양콩할머니',
      category: '한식',
      distance: 10,
      description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은
  되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께
  운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을
  선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며
  만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이
  먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
      link: 'https://www.naver.com',
      isFavorite: false,
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

  paintDetailModal(restaurant: any) {
    (this.querySelector('.detail-modal') as BasicModal).openModal();
    this.#restaurantItemDetail.setState(restaurant);
  }

  #updateDetailFavoriteListener(event: Event) {
    // TODO
    if ((event.target as HTMLElement).classList.contains('restaurant')) {
      (document.querySelector('.main-app-new') as MainApp).paintDetailModal(
        (event.target as FavoriteIcon).isFavorite(),
      );
    }
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
