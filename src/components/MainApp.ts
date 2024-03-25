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
  $modal: BasicModal;
  $newRestaurantModalItem: HTMLDivElement;
  $detailRestaurantModalItem: HTMLDivElement;

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
    
    <div is="basic-modal" class="modal basic-modal " class-container="new-restaurant-modal__container" >
      <div class="modal-item new-restaurant-modal-item">  
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form is="new-restaurant-form" class="new-restaurant-form"></form> 
      </div>
      <div class="modal-item detail-modal-item">  
        <li is="restaurant-item-detail" class="restaurant-item-detail" style=""></li>
      </div>
    </div>

    `;

    this.$navTab = dom.getElement(this, 'div[is="my-tab"]');
    this.$modal = dom.getElement(this, '.basic-modal');
    this.$allRestaurantApp = dom.getElement(this, '.all-restaurant-app');
    this.$favoriteRestaurantApp = dom.getElement(this, '.favorite-restaurant-app');
    this.render();

    this.$navTab.addEventListener('click', this.render.bind(this));

    const $form: NewRestaurantForm = dom.getElement(this.$modal, '.new-restaurant-form');
    $form.addEventListener('submit', this.#onSubmitForm.bind(this));

    this.$newRestaurantModalItem = dom.getElement(this.$modal, '.new-restaurant-modal-item');
    this.$detailRestaurantModalItem = dom.getElement(this.$modal, '.detail-modal-item');
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

  renderNewRestaurantModal() {
    this.$detailRestaurantModalItem.classList.add('hidden');
    this.$newRestaurantModalItem.classList.remove('hidden');
    this.$modal.openModal();
  }

  paintDetailModal(restaurant: IRestaurant) {
    this.$newRestaurantModalItem.classList.add('hidden');
    this.$detailRestaurantModalItem.classList.remove('hidden');
    this.$modal.openModal();
    this.$detailRestaurantModalItem.replaceChildren(new RestaurantItemDetail(restaurant));
  }

  #onSubmitForm(e: Event) {
    const $form: NewRestaurantForm = dom.getElement(this.$modal, '.new-restaurant-form');

    e.preventDefault();
    $form.invisibleErrorMessage();
    const { name, distance, category, description, link } = $form.getValues();
    if ($form.validateRequiredValues(category, distance, name)) return;

    new RestaurantDBService().add({ name, distance, category, description, link });

    this.render();
    $form.invisibleErrorMessage();
    this.$modal.closeModal();
  }
}

customElements.define('main-app', MainApp, { extends: 'div' });

export default MainApp;
