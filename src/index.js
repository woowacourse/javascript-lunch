import LunchPickerApp from './LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader';
import LunchPickerTab from './components/LunchPickerTab';
import RestaurantList from './components/RestaurantList';
import RestaurantItem from './components/RestaurantItem';
import RestaurantAddModal from './components/modal/RestaurantAddModal';
import RestaurantDetailModal from './components/modal/RestaurantDetailModal';
import CategoryIcon from './components/CategoryIcon';
import FavoriteButton from './components/FavoriteButton';
import FilterBox from './components/FilterBox';

import './styles/style.css';

customElements.define('lunch-picker-app', LunchPickerApp);
customElements.define('lunch-picker-header', LunchPickerHeader);
customElements.define('lunch-picker-tab', LunchPickerTab);
customElements.define('restaurant-list', RestaurantList);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-add-modal', RestaurantAddModal);
customElements.define('restaurant-detail-modal', RestaurantDetailModal);
customElements.define('favorite-button', FavoriteButton);
customElements.define('category-icon', CategoryIcon);
customElements.define('filter-box', FilterBox);

document.addEventListener('DOMContentLoaded', () => {
  const app = new LunchPickerApp();
  document.body.appendChild(app);
});
