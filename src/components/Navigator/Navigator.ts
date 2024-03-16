import Button from '../base/Button';
import './Navigator.css';

const TOTAL = 'total';
const FAVORITE = 'favorite';

type NAV_STATE = 'total' | 'favorite';

class Navigator {
  #navigatorElement = document.createElement('div');

  #navState: NAV_STATE = TOTAL;

  constructor() {
    this.#generateButtons();
    this.#navigatorElement.classList.add('navigator-container');
  }

  #generateButtons() {
    const totalRestaurantButtonContainer = document.createElement('div');
    const favoriteRestaurantButtonContainer = document.createElement('div');

    totalRestaurantButtonContainer.classList.add('nav-button-container-clicked');
    favoriteRestaurantButtonContainer.classList.add('nav-button-container');

    const totalRestaurantButton = new Button({
      content: '모든 음식점',
      addClassList: ['nav-button-container-clicked'],
      onClick: () => {
        totalRestaurantButtonContainer.classList.add('nav-button-container-clicked');
        totalRestaurantButtonContainer.classList.remove('nav-button-container');
        favoriteRestaurantButtonContainer.classList.remove('nav-button-container-clicked');
        favoriteRestaurantButtonContainer.classList.add('nav-button-container');
        this.changeState(FAVORITE);
      },
    });

    const favoriteRestaurantButton = new Button({
      content: '자주 가는 음식점',
      addClassList: ['nav-button-container'],
      onClick: () => {
        totalRestaurantButtonContainer.classList.remove('nav-button-container-clicked');
        totalRestaurantButtonContainer.classList.add('nav-button-container');
        favoriteRestaurantButtonContainer.classList.add('nav-button-container-clicked');
        favoriteRestaurantButtonContainer.classList.remove('nav-button-container');
        this.changeState(TOTAL);
      },
    });

    totalRestaurantButtonContainer.appendChild(totalRestaurantButton.element);
    favoriteRestaurantButtonContainer.appendChild(favoriteRestaurantButton.element);

    this.#navigatorElement.appendChild(totalRestaurantButtonContainer);
    this.#navigatorElement.appendChild(favoriteRestaurantButtonContainer);
  }

  changeState(prevState: NAV_STATE) {
    if (prevState === TOTAL) {
      this.#navState = FAVORITE;
      return;
    }
    this.#navState = TOTAL;
  }

  get element() {
    return this.#navigatorElement;
  }
}

export default Navigator;
