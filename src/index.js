import '../templates/style.css';
import WebController from './Controller/WebController';

import Dropdown from './view/components/Dropdown';
import RestaurantCards from './view/components/RestaurantCards';
import RestaurantCard from './view/components/RestaurantCard';
import './view/components/LikeSection';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });
window.customElements.define('restaurant-cards', RestaurantCards, { extends: 'ul' });
window.customElements.define('restaurant-card', RestaurantCard, { extends: 'li' });

new WebController().run();
