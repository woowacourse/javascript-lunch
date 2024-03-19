import LunchPickerApp from './LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader/LunchPickerHeader';
import LunchPickerTab from './components/LunchPickerTab/LunchPickerTab';
import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantItem from './components/RestaurantItem/RestaurantItem';
import RestaurantAddModal from './components/modal/RestaurantAddModal/RestaurantAddModal';
import RestaurantDetailModal from './components/modal/RestaurantDetailModal/RestaurantDetailModal';
import CategoryIcon from './components/CategoryIcon/CategoryIcon';
import FavoriteButton from './components/FavoriteButton/FavoriteButton';
import FilterBox from './components/FilterBox/FilterBox';

import './styles/common.css';

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
