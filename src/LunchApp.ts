import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
import './components/LunchTab/LunchTab';
import './components/LunchTabAll/LunchTabAll';
import './components/LunchRegisterModal/LunchRegisterModal';

import DUMMY from './constants/dummy';
import { LOCALSTORAGE } from './constants/localStorage';

const LUNCH_APP = /* HTML */ `
  <lunch-header></lunch-header>
  <lunch-tab></lunch-tab>
  <lunch-tab-all></lunch-tab-all>
  <lunch-register-modal></lunch-register-modal>
`;

class LunchApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  setData() {
    localStorage.getItem(LOCALSTORAGE.restaurants) ??
      localStorage.setItem(LOCALSTORAGE.restaurants, JSON.stringify(DUMMY));
  }

  render() {
    this.setData();
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
