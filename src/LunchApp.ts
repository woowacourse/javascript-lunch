import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
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
  connectedCallback() {
    localStorage.getItem('restaurants') ??
      localStorage.setItem('restaurants', JSON.stringify(DUMMY));
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
