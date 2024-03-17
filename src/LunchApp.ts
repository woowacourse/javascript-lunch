/* eslint-disable import/no-duplicates */
import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
import './components/LunchTab/LunchTab';
import './components/LunchItemFilter/LunchItemFilter';
import './components/LunchItem/LunchItem';
import './components/LunchItems/LunchItems';
import './components/LunchRegisterModal/LunchRegisterModal';
import './components/LunchItemModal/LunchItemModal';

import LunchTab from './components/LunchTab/LunchTab';
import LunchItemFilter from './components/LunchItemFilter/LunchItemFilter';
import LunchItems from './components/LunchItems/LunchItems';

import DUMMY from './constants/dummy';

const LUNCH_APP = `
  <lunch-header></lunch-header>
  <lunch-item-filter></lunch-item-filter>
  <lunch-items></lunch-items>
  <lunch-register-modal></lunch-register-modal>
  <lunch-item-modal></lunch-item-modal>
`;

class LunchApp extends HTMLElement {
  constructor() {
    super();

    this.render();
    this.setRenderEventListener();
    this.setToggleRegisterModalEventListener();
  }

  // eslint-disable-next-line max-lines-per-function
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
    if (!localStorage.getItem('restaurants')) {
      localStorage.setItem('restaurants', JSON.stringify(DUMMY));
    }
    if (!localStorage.getItem('liked')) {
      localStorage.setItem('liked', JSON.stringify([]));
    }
    this.innerHTML = LUNCH_APP;
  }

  setRenderEventListener() {
    this.addEventListener('render', () => {
      this.handleRender();
    });
  }

  // eslint-disable-next-line max-lines-per-function
  handleRender() {
    const items = document.querySelector('lunch-items') as LunchItems;
    const tab = (document.querySelector('.lunch-tab') as LunchTab).nowSelected;
    const filter = document.querySelector('lunch-item-filter') as LunchItemFilter;
    const dropdowns = filter.querySelectorAll('select');
    if (tab === 'favorite-restaurants') {
      items.renderItems({ database: 'liked' });
    } else {
      items.renderItems({ category: dropdowns[0].value, sortBy: dropdowns[1].value });
    }
  }

  setToggleRegisterModalEventListener() {
    this.addEventListener('toggleRegisterModal', () => {
      this.handleToggleRegisterModal();
    });
  }

  handleToggleRegisterModal() {
    const modal = this.querySelector('lunch-register-modal')?.querySelector('.modal');
    if (modal?.className) {
      modal.classList.toggle('modal--open');
    }
  }
}

customElements.define('lunch-app', LunchApp);
