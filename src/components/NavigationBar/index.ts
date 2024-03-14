import './style.css';

import { RestaurantListController } from '../../services';

const SELECTED = 'selected';
class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $navigation = document.createElement('nav');
    const $allListBtnContainer = document.createElement('div');
    const $favoriteListBtnContainer = document.createElement('div');

    const CONTAINER_CLASS = 'nav__btn-container';
    const UNDER_BAR_CLASS = 'under-bar';

    const $allListBtn = document.createElement('button');
    const $favoriteListBtn = document.createElement('button');

    $allListBtnContainer.appendChild($allListBtn);
    $allListBtnContainer.className = `${CONTAINER_CLASS} ${SELECTED}`;
    $allListBtn.textContent = '모든 음식점';

    $favoriteListBtnContainer.appendChild($favoriteListBtn);
    $favoriteListBtnContainer.className = CONTAINER_CLASS;
    $favoriteListBtn.textContent = '자주 가는 음식점';

    // under-bar
    [$allListBtnContainer, $favoriteListBtn].forEach((el) => {
      const $underBar = document.createElement('div');
      $underBar.className = UNDER_BAR_CLASS;

      el.appendChild($underBar);
    });

    $navigation.appendChild($allListBtnContainer);
    $navigation.appendChild($favoriteListBtnContainer);

    this.appendChild($navigation);

    $allListBtn.addEventListener('click', (event) =>
      this.#addEventToOpenAllList(event),
    );

    $favoriteListBtn.addEventListener('click', (event) =>
      this.#addEventToOpenFavoriteList(event),
    );
  }

  #toggleClassName() {
    this.querySelectorAll('.nav__btn-container').forEach((el) =>
      el.classList.toggle(SELECTED),
    );
  }

  #addEventToOpenAllList(event: MouseEvent) {
    event.stopPropagation();

    this.#toggleClassName();
    RestaurantListController.injectAllRestaurantList();
  }

  #addEventToOpenFavoriteList(event: MouseEvent) {
    event.stopPropagation();

    this.#toggleClassName();
    RestaurantListController.injectFavoriteRestaurantList();
  }
}

customElements.define('navigation-bar', NavigationBar);
