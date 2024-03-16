import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
import './components/LunchTab/LunchTab';
import './components/LunchTabAll/LunchTabAll';
import './components/LunchTabLiked/LunchTabLiked';
import './components/LunchRegisterModal/LunchRegisterModal';

import DUMMY from './constants/dummy';
import { LOCAL_STORAGE_KEYS } from './constants/localStorageKeys';

const LUNCH_APP = /* HTML */ `
  <lunch-header></lunch-header>
  <lunch-tab></lunch-tab>
  <lunch-tab-all></lunch-tab-all>
  <lunch-tab-liked class="lunch-tab-liked--closed"></lunch-tab-liked>
  <lunch-register-modal></lunch-register-modal>
`;

class LunchApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setData() {
    localStorage.getItem(LOCAL_STORAGE_KEYS.restaurants) ??
      localStorage.setItem(LOCAL_STORAGE_KEYS.restaurants, JSON.stringify(DUMMY));
  }

  render() {
    this.setData();
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
