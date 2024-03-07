import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';
import './components/LunchItemFilter/LunchItemFilter';
import './components/LunchItem/LunchItem';
import './components/LunchItems/LunchItems';
import { RestaurantRegister } from './domain';

const LUNCH_APP = `
<lunch-header></lunch-header>
<lunch-item-filter></lunch-item-filter>
<lunch-items></lunch-items>
`;

class LunchApp extends HTMLElement {
  connectedCallback() {
    this.render();
    localStorage.setItem(
      'restaurants',
      JSON.stringify([
        {
          category: '양식',
          name: '123',
          distance: 10,
          createdAt: new Date(),
        },
      ]),
    );
  }

  render() {
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
