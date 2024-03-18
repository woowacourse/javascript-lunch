import { APP_NAME } from '../constant/cons.js';
import { $ } from '../utils/selector.js';
import { openModal } from './modal/modal.js';


function createHeader({
  className,
  left,
  right,
  addRestaurant,
  getRestaurantList,
  favoriteToggle,
  hasFavorite,
}) {
  const header = document.createElement('header');
  header.className = className;

  const leftElement = item[left]();
  const rightElement = item[right]({
    addRestaurant,
    getRestaurantList,
    favoriteToggle,
    hasFavorite,
  });


  header.append(leftElement, rightElement);
  return header;
}

// REFACTOR: 앱 이름 상수로 분리
const item = {
  logo() {
    const h1 = document.createElement('h1');
    h1.className = 'gnb__title text-title';
    h1.textContent = APP_NAME;
    return h1;
  },

  add({ addRestaurant, getRestaurantList, favoriteToggle, hasFavorite }) {

    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'gnb__button';
    button.setAttribute('aria-label', '음식점 추가');

    const img = document.createElement('img');

    img.src = './add-button.png';
    img.alt = '음식점 추가';

    button.appendChild(img);
    eventHandler.add({
      element: button,
      addRestaurant,
      getRestaurantList,
      favoriteToggle,
      hasFavorite,
    });


    return button;
  },
};

const eventHandler = {
  add({
    element,
    addRestaurant,
    getRestaurantList,
    favoriteToggle,
    hasFavorite,
  }) {
    element.addEventListener('click', () => {
      openModal('addRestaurant', {
        addRestaurant,
        getRestaurantList,
        favoriteToggle,
        hasFavorite,
      });
    });
  },
};

export default createHeader;
