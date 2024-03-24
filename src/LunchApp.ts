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
import LunchItemModal from './components/LunchItemModal/LunchItemModal';
import LunchModal from './components/LunchModal/LunchModal';
import connectedCollection from './api/Collection';

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
    this.setRerenderEventListener();
    this.setToggleRegisterModalEventListener();
    this.setToggleItemDetailModalEventListener();
    this.setResetFilterDropdownsEventListener();
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
    this.innerHTML = LUNCH_APP;
  }

  setRerenderEventListener() {
    this.addEventListener('rerender', () => {
      this.handleRerender();
    });
  }

  // eslint-disable-next-line max-lines-per-function
  handleRerender() {
    const items = this.querySelector('lunch-items') as LunchItems;
    const tab = (this.querySelector('.lunch-tab') as LunchTab).nowSelected;
    const filter = this.querySelector('lunch-item-filter') as LunchItemFilter;
    const dropdowns = filter.querySelectorAll('select');
    if (tab === 'favorite-restaurants') {
      items.render({ database: 'liked' });
    } else {
      items.render({ category: dropdowns[0].value, sortBy: dropdowns[1].value });
    }
  }

  setToggleRegisterModalEventListener() {
    this.addEventListener('toggleRegisterModal', () => {
      this.handleToggleRegisterModal();
    });
  }

  handleToggleRegisterModal() {
    const modal = this.querySelector('lunch-register-modal')?.querySelector('.modal');
    if (!(modal instanceof LunchModal)) return;
    modal.handleToggleModal();
  }

  setToggleItemDetailModalEventListener() {
    this.addEventListener('toggleItemDetailModal', (event) => {
      if (!(event instanceof CustomEvent)) return;
      this.handleToggleItemDetailModal(event);
    });
  }

  handleToggleItemDetailModal(event: CustomEvent) {
    const lunchItemModal = this.querySelector('lunch-item-modal');
    if (!(lunchItemModal instanceof LunchItemModal)) return;
    lunchItemModal.setRestaurant(event.detail.info);
    const modal = lunchItemModal.querySelector('.modal');
    if (!(modal instanceof LunchModal)) return;
    modal.handleToggleModal();
  }

  setResetFilterDropdownsEventListener() {
    this.addEventListener('resetFilterDropdowns', () => {
      this.handleResetFilterDropdowns();
    });
  }

  handleResetFilterDropdowns() {
    const filter = this.querySelector('lunch-item-filter');
    if (!(filter instanceof LunchItemFilter)) return;
    filter.resetDropdowns();
  }

  setResetFavoriteTabEventListener() {
    this.addEventListener('resetFavoriteTab', () => {
      this.handleResetFavoriteTab();
    });
  }

  handleResetFavoriteTab() {
    const tab = this.querySelector('lunch-tab');
    if (!(tab instanceof LunchTab)) return;
    tab.handleResetTab();
    this.handleResetFilterDropdowns();
    this.handleRerender();
  }
}

customElements.define('lunch-app', LunchApp);
