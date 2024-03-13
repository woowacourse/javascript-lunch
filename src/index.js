import '../style.css';
import WebController from './Controller/WebController';

import Dropdown from './components/Dropdown';
import RestaurantCards from './components/RestaurantCards';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });
window.customElements.define('restaurant-cards', RestaurantCards, { extends: 'ul' });

new WebController().run();
