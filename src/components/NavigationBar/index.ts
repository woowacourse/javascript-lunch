import './style.css';

const SELECTED = 'selected';
class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $navigation = document.createElement('nav');

    $navigation.innerHTML = /* html */ `
    <nav-bar-btn-container name="all" btn-text="모든 음식점" class=${SELECTED}></nav-bar-btn-container>
    <nav-bar-btn-container name="favorite" btn-text="자주 가는 음식점"></nav-bar-btn-container>
    `;

    this.appendChild($navigation);
    $navigation.querySelectorAll('nav-bar-btn-container').forEach(($el) => {
      $el.addEventListener('click', (event) =>
        this.#handleClickToChangeClassOfNavBtnContainer(event),
      );
    });
  }

  #handleClickToChangeClassOfNavBtnContainer(event: Event) {
    const { currentTarget } = event;

    if (!(currentTarget instanceof HTMLElement)) return;

    if (currentTarget.classList.contains(SELECTED)) return;

    const $selectedBtnContainer = this.querySelector(`.${SELECTED}`);

    $selectedBtnContainer?.classList.remove(SELECTED);
    currentTarget.classList.add(SELECTED);

    const name = currentTarget.getAttribute('name');

    if (name) {
      this.#changeRestaurantList(name);
    }
  }

  #changeRestaurantList(selectedName: string) {
    const $listContainer = document.querySelector('.restaurant-list-container');

    if (!$listContainer) return;

    if (selectedName === 'favorite') {
      $listContainer.innerHTML = `<restaurant-list list-category="favorite"></restaurant-list>`;
      return;
    }

    $listContainer.innerHTML = `<all-restaurant-list></all-restaurant-list>`;
  }
}

customElements.define('navigation-bar', NavigationBar);
