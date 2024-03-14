import '../style.css';
import WebController from './Controller/WebController';

import Dropdown from './components/Dropdown';
import RestaurantCards from './components/RestaurantCards';
import RestaurantCard from './components/RestaurantCard';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });
window.customElements.define('restaurant-cards', RestaurantCards, { extends: 'ul' });
window.customElements.define('restaurant-item', RestaurantCard, { extends: 'li' });

new WebController().run();
