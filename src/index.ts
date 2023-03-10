import FavoriteIcon from './components/\bIcon/FavoriteIcon';
import DetailModal from './components/DetailModal';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import Tab from './components/Tab';
import { initialRestaurants } from './constants/restaurants';
import store from './store';
import './styles';

if (!localStorage.getItem('store')) {
  localStorage.setItem('store', JSON.stringify(initialRestaurants));
}
store.restaurants = JSON.parse(localStorage.getItem('store') || '{}');

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);
customElements.define('detail-modal', DetailModal);
customElements.define('favorite-icon', FavoriteIcon);
customElements.define('lunch-tab', Tab);
