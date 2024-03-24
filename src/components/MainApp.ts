import { dom } from '@/util/dom';
import { IRestaurant } from '@/types/Restaurant';

import NavTab from './Basic/NavTab';
import AllRestaurantApp from './AllRestaurantApp';
import FavoriteRestaurantApp from './FavoriteRestaurantApp';
import BasicModal from './Basic/BasicModal';
import RestaurantItemDetail from './RestaurantList/RestaurantItemDetail';
import NewRestaurantForm from './RestaurantList/NewRestaurantForm';
import RestaurantDBService from '@/domains/services/RestaurantDBService';

import '@/css/index.css';
import './MainApp.css';

class MainApp extends HTMLDivElement {
  $navTab: NavTab;
  $allRestaurantApp: AllRestaurantApp;
  $favoriteRestaurantApp: FavoriteRestaurantApp;
  $newRestaurantModal: BasicModal;
  $restaurantDetailModal: BasicModal;

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

    <div is="all-restaurant-app" class="all-restaurant-app" data-id="all"></div>
    <div is="favorite-restaurant-app" class="hidden favorite-restaurant-app" data-id="favorite"></div>
    
    <div is="basic-modal" class="modal basic-modal new-restaurant-modal" class-container="new-restaurant-modal__container" >
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form is="new-restaurant-form" class="new-restaurant-form"></form> 
    </div>

    <div is="basic-modal" class="modal basic-modal detail-modal" class-container="detail-modal__container" >
      <li is="restaurant-item-detail" class="restaurant-item-detail" style=""></li>
    </div>
    `;

    this.$navTab = dom.getElement<NavTab>(this, 'div[is="my-tab"]');
    this.$newRestaurantModal = dom.getElement<BasicModal>(this, '.new-restaurant-modal');
    this.$allRestaurantApp = dom.getElement<AllRestaurantApp>(this, '.all-restaurant-app');
    this.$favoriteRestaurantApp = dom.getElement<FavoriteRestaurantApp>(
      this,
      '.favorite-restaurant-app',
    );
    this.render();

    this.$navTab.addEventListener('click', this.render.bind(this));

    this.$newRestaurantModal = dom.getElement(this, '.new-restaurant-modal');
    this.#setSubmitEvent();

    this.$restaurantDetailModal = dom.getElement(this, '.detail-modal');
    this.$restaurantDetailModal.appendAll([]);
  }

  render() {
    if (
      this.$allRestaurantApp ===
      this.querySelector(`.main-app-new > div[data-id="${this.$navTab.getSelected().dataset.id}"]`)
    ) {
      this.$favoriteRestaurantApp.classList.add('hidden');
      this.$allRestaurantApp.classList.remove('hidden');
      this.$allRestaurantApp.render();
    } else {
      this.$allRestaurantApp.classList.add('hidden');
      this.$favoriteRestaurantApp.classList.remove('hidden');
      this.$favoriteRestaurantApp.render();
    }
  }

  paintDetailModal(restaurant: IRestaurant) {
    this.$restaurantDetailModal.openModal();
    this.$restaurantDetailModal.replaceChildNodes([new RestaurantItemDetail(restaurant)]);
  }

  #setSubmitEvent() {
    const $form: NewRestaurantForm = dom.getElement(
      this.$newRestaurantModal,
      '.new-restaurant-form',
    );

    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      $form.invisibleErrorMessage();
      const { name, distance, category, description, link } = $form.getValues();
      if ($form.validateRequiredValues(category, distance, name)) return;

      new RestaurantDBService().add({ name, distance, category, description, link });

      this.render();
      $form.invisibleErrorMessage();
      this.$newRestaurantModal.closeModal();
    });
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
