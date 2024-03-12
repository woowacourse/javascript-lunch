import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
import './components/LunchItemFilter/LunchItemFilter';
import './components/LunchItem/LunchItem';
import './components/LunchItems/LunchItems';
import './components/LunchRegisterModal/LunchRegisterModal';

import DUMMY from './constants/dummy';
import { LOCALSTORAGE } from './constants/localStorage';

const LUNCH_APP = `
  <lunch-header></lunch-header>
  <lunch-item-filter></lunch-item-filter>
  <lunch-items></lunch-items>
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
