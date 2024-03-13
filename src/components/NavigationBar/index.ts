import './style.css';

import { RestaurantListContainerController } from '../../services';

class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $navigation = document.createElement('nav');
    const $allListBtnContainer = document.createElement('div');
    const $favoriteListBtnContainer = document.createElement('div');
    const SELECTED = 'selected';
    const CONTAINER_CLASS = 'nav__btn-container';
    const UNDER_BAR_CLASS = 'under-bar';

    const $allListBtn = document.createElement('button');
    const $favoriteListBtn = document.createElement('button');

    // underBar
    const $underBarForAllList = document.createElement('div');
    const $underBarForFavoriteList = document.createElement('div');
    $underBarForAllList.className = UNDER_BAR_CLASS;
    $underBarForFavoriteList.className = UNDER_BAR_CLASS;

    $allListBtnContainer.appendChild($allListBtn);
    $allListBtnContainer.appendChild($underBarForAllList);
    $allListBtnContainer.className = `${CONTAINER_CLASS} ${SELECTED}`;
    $allListBtn.textContent = '모든 음식점';

    $favoriteListBtnContainer.appendChild($favoriteListBtn);
    $favoriteListBtnContainer.appendChild($underBarForFavoriteList);
    $favoriteListBtnContainer.className = CONTAINER_CLASS;
    $favoriteListBtn.textContent = '자주 가는 음식점';

    $navigation.appendChild($allListBtnContainer);
    $navigation.appendChild($favoriteListBtnContainer);

    this.appendChild($navigation);

    $allListBtn.addEventListener('click', (event) =>
      this.#addEventToOpenAllList(event, SELECTED),
    );

    $favoriteListBtn.addEventListener('click', (event) =>
      this.#addEventToOpenFavoriteList(event, SELECTED),
    );
  }

  #toggleClassName(selected: string) {
    this.querySelectorAll('.nav__btn-container').forEach((el) =>
      el.classList.toggle(selected),
    );
  }

  #addEventToOpenAllList(event: MouseEvent, selected: string) {
    event.stopPropagation();

    this.#toggleClassName(selected);
    RestaurantListContainerController.injectAllRestaurantList();
  }

  #addEventToOpenFavoriteList(event: MouseEvent, selected: string) {
    event.stopPropagation();

    this.#toggleClassName(selected);
    RestaurantListContainerController.injectFavoriteRestaurantList();
  }
}

customElements.define('navigation-bar', NavigationBar);
