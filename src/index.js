import '../templates/style.css';
import WebController from './Controller/WebController';

import Dropdown from './view/components/Dropdown';
import RestaurantCards from './view/components/RestaurantCards';
import RestaurantCard from './view/components/RestaurantCard';
import runLikeSectionLogic from './view/components/LikeSection';
import LikeStar from './view/components/LikeStar';

window.customElements.define('drop-down', Dropdown, { extends: 'select' });
window.customElements.define('restaurant-cards', RestaurantCards, { extends: 'ul' });
window.customElements.define('restaurant-card', RestaurantCard, { extends: 'li' });
window.customElements.define('like-start', LikeStar);

new WebController().run();

runLikeSectionLogic();
