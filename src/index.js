import './css/reset.css';
import './css/index.css';

import './images/add-button.png';
import './images/category-asian.svg';
import './images/category-chinese.svg';
import './images/category-etc.svg';
import './images/category-japanese.svg';
import './images/category-korean.svg';
import './images/category-western.svg';
import './images/favorite-icon-filled.svg';
import './images/favorite-icon-lined.svg';

import RestaurantController from './controllers/RestaurantController';

new RestaurantController().run();
