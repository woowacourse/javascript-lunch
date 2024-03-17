import './style.css';

import { RestaurantListController } from '../../services';
import RestaurantListTemplate from '../RestaurantListTemplate';

class AllRestaurantList extends RestaurantListTemplate {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('list-category', 'all');

    // filtering, sorting dropbox 추가
    this.#addDropBoxGroupToContainer();
    // 해당 커스컴 요소 구현 후, drop box 선택 여부에 따른 음식점 목록 ui 구현 및 이벤트 설정
    requestAnimationFrame(() => {
      RestaurantListController.injectFilteringAndSortingRestaurantList();
      this.#addEventToFilteringAndSorting();
    });
  }

  #addDropBoxGroupToContainer() {
    const $listContainer = this.parentElement;

    if (!$listContainer) return;

    const $dropBoxGroup = document.createElement('div');
    $dropBoxGroup.className = 'drop-box-group';

    const $filteringCategory = document.createElement('drop-box');
    $filteringCategory.setAttribute('name', 'filteringCategory');
    const $filteringSorting = document.createElement('drop-box');
    $filteringSorting.setAttribute('name', 'filteringSorting');

    $dropBoxGroup.appendChild($filteringCategory);
    $dropBoxGroup.appendChild($filteringSorting);
    $listContainer.prepend($dropBoxGroup);
  }

  #addEventToFilteringAndSorting() {
    const $filteringCategory = document.getElementById('filtering-category');
    const $filteringSorting = document.getElementById('filtering-sorting');

    $filteringCategory?.addEventListener('change', () => {
      RestaurantListController.injectFilteringAndSortingRestaurantList();
    });

    $filteringSorting?.addEventListener('change', () => {
      RestaurantListController.injectFilteringAndSortingRestaurantList();
    });
  }
}

customElements.define('all-restaurant-list', AllRestaurantList);
