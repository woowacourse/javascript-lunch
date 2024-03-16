import LunchPickerApp from './components/LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader';
import FilterBox from './components/FilterBox';
import RestaurantList from './components/RestaurantList';
import RestaurantItem from './components/RestaurantItem';
import RestaurantAddModal from './components/RestaurantAddModal';

import './styles/style.css';
import './styles/restaurantThemeSelector.style.css';
import './styles/restaurantItem.style.css';
import RestaurantThemeSelector from './components/RestaurantThemeSelector';

customElements.define('lunch-picker-app', LunchPickerApp);
customElements.define('lunch-picker-header', LunchPickerHeader);
customElements.define('restaurant-theme-selector', RestaurantThemeSelector);
customElements.define('restaurant-list', RestaurantList);
customElements.define('filter-box', FilterBox);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-add-modal', RestaurantAddModal);
