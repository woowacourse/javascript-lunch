import FilterList from './components/FilterList';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantBox from './components/RestaurantBox/RestaurantBox';
import './styles/index.css';

customElements.define('lunch-header', Header);
customElements.define('restaurant-modal', Modal);
customElements.define('filter-list', FilterList);
customElements.define('restaurant-box', RestaurantBox);
