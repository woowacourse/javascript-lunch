import Button from './components/Button';
import FilterList from './components/FilterList';
import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantBox from './components/RestaurantBox';
import SelectList from './components/SelectList';
import TextInput from './components/TextInput';
import './styles/index.css';

customElements.define('lunch-header', Header);
customElements.define('restaurant-modal', Modal);
customElements.define('filter-list', FilterList);
customElements.define('restaurant-box', RestaurantBox);
customElements.define('select-list', SelectList);
customElements.define('text-input', TextInput);
customElements.define('lunch-button', Button);
