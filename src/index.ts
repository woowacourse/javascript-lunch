import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import './styles';

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);
