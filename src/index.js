import App from './App';
import '../style.css';

import RestaurantList from './components/RestaurantList';
import RestaurantCard from './components/RestaurantCard';
import Dropdown from './components/Dropdown/Dropdown';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });
window.customElements.define('restaurant-list', RestaurantList, { extends: 'ul' });
window.customElements.define('restaurant-item', RestaurantCard, { extends: 'li' });

new App().run();
