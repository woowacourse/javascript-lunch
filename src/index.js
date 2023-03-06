import AddRestaurantModal from './components/AddRestaurantModal';
import FilterBox from './components/FilterBox';
import Header from './components/Header';
import RestaurantBox from './components/RestaurantBox';
import AddSelect from './components/AddSelect';
import './styles/index.css';
import AddTextInput from './components/AddTextInput';
import Button from './components/Button';
import LunchRecommendation from './domain/controller/LunchRecommendation';

customElements.define('lunch-header', Header);
customElements.define('category-list', FilterBox);
customElements.define('restaurant-box', RestaurantBox);
customElements.define('add-restaurant-modal', AddRestaurantModal);
customElements.define('add-category-list', AddSelect);
customElements.define('add-text-input', AddTextInput);
customElements.define('lunch-button', Button);

new LunchRecommendation().play();
