import AddRestaurantModal from './components/AddRestaurantModal';
import CategoryList from './components/CategoryList';
import Header from './components/Header';
import RestaurantBox from './components/RestaurantBox';
import AddCategoryList from './components/AddCategoryList';
import './styles/index.css';
import AddTextInput from './components/AddTextInput';

customElements.define('lunch-header', Header);
customElements.define('category-list', CategoryList);
customElements.define('restaurant-box', RestaurantBox);
customElements.define('add-restaurant-modal', AddRestaurantModal);
customElements.define('add-category-list', AddCategoryList);
customElements.define('add-text-input', AddTextInput);
