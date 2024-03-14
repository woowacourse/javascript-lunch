import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
// eslint-disable-next-line import/no-duplicates
import './components/LunchTab/LunchTab';
import LunchTab from './components/LunchTab/LunchTab';
import './components/LunchItemFilter/LunchItemFilter';
import './components/LunchItem/LunchItem';
import './components/LunchItems/LunchItems';
import './components/LunchRegisterModal/LunchRegisterModal';

import DUMMY from './constants/dummy';

const LUNCH_APP = `
  <lunch-header></lunch-header>
  <lunch-item-filter></lunch-item-filter>
  <lunch-items></lunch-items>
  <lunch-register-modal></lunch-register-modal>
`;

class LunchApp extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.render();
    this.querySelector('lunch-header')?.insertAdjacentElement(
      'afterend',
      new LunchTab([
        {
          className: ['tab-button__active'],
          name: `all-restaurants`,
          textContent: '모든 음식점',
        },
        {
          name: `favorite-restaurants`,
          textContent: '자주 가는 음식점',
        },
      ]),
    );
  }

  render() {
    localStorage.getItem('restaurants') ??
      localStorage.setItem('restaurants', JSON.stringify(DUMMY));
    localStorage.getItem('liked') ?? localStorage.setItem('liked', JSON.stringify([]));
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
