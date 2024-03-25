import customCreateElement from '../../utils/customCreateElement';
import Button from '../Button/Button';
import './Navigator.css';

export const NAV_TOTAL = 'total';
export const NAV_FAVORITE = 'favorite';

type NAV_STATE = 'total' | 'favorite';

class Navigator {
  #navigatorElement = document.createElement('div');

  #navState: NAV_STATE = NAV_TOTAL;

  #onClick: (state: string) => void;

  constructor(onClick: (state: string) => void) {
    this.#generateNavBar();
    this.#navigatorElement.classList.add('navigator-container');
    this.#onClick = onClick;
  }

  #generateNavBar() {
    const totalButtonContainer = customCreateElement({
      elementType: 'div',
      classList: ['nav-button-container-clicked'],
    });
    const favoriteButtonContainer = customCreateElement({
      elementType: 'div',
      classList: ['nav-button-container'],
    });
    totalButtonContainer.appendChild(this.#generateTotalButton(totalButtonContainer, favoriteButtonContainer));
    favoriteButtonContainer.appendChild(this.#generateFavoriteButton(totalButtonContainer, favoriteButtonContainer));
    this.#navigatorElement.appendChild(totalButtonContainer);
    this.#navigatorElement.appendChild(favoriteButtonContainer);
  }

  #generateTotalButton(totalButtonContainer: HTMLElement, favoriteButtonContainer: HTMLElement) {
    const totalButton = new Button({
      content: '모든 음식점',
      addClassList: ['nav-button-container-clicked'],
      onClick: () => {
        this.#toggleRestaurantList(totalButtonContainer, favoriteButtonContainer);
        this.#changeState(NAV_TOTAL);
        this.#onClick(NAV_TOTAL);
      },
    });

    return totalButton.element;
  }

  #generateFavoriteButton(totalButtonContainer: HTMLElement, favoriteButtonContainer: HTMLElement) {
    const favoriteButton = new Button({
      content: '자주 가는 음식점',
      addClassList: ['nav-button-container'],
      onClick: () => {
        this.#toggleRestaurantList(totalButtonContainer, favoriteButtonContainer);
        this.#changeState(NAV_FAVORITE);
        this.#onClick(NAV_FAVORITE);
      },
    });

    return favoriteButton.element;
  }

  #toggleRestaurantList(totalButtonContainer: HTMLElement, favoriteButtonContainer: HTMLElement) {
    totalButtonContainer.classList.toggle('nav-button-container-clicked');
    totalButtonContainer.classList.toggle('nav-button-container');
    favoriteButtonContainer.classList.toggle('nav-button-container-clicked');
    favoriteButtonContainer.classList.toggle('nav-button-container');
  }

  #changeState(navState: NAV_STATE) {
    this.#navState = navState;
  }

  get element() {
    return this.#navigatorElement;
  }

  get navState() {
    return this.#navState;
  }
}

export default Navigator;
