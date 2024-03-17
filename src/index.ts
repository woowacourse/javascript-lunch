import '../global.css';
import './assets/images/add-button.png';
import './assets/images/favorite-icon-filled.png';
import './assets/images/favorite-icon-lined.png';

import App from './components/App';
import { INITIAL_RESTAURANT_LIST } from './constants/config';
import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';

const initialRestaurantList = new RestaurantList(INITIAL_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));
new App(document.body, { restaurantList: initialRestaurantList });
