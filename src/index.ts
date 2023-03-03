import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import { initialRestaurants } from './restaurants';
import store from './store';
import './styles';

if (!localStorage.getItem('store')) {
  localStorage.setItem('store', JSON.stringify(initialRestaurants));
}
store.restaurants = JSON.parse(localStorage.getItem('store') || '[]');

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);
