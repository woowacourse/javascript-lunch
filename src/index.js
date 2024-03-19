import LunchPickerApp from './components/LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader';
import LunchPickerModal from './components/LunchPickerModal';
import FilterBox from './components/FilterBox';
import RestaurantList from './components/RestaurantList';
import RestaurantItem from './components/RestaurantItem';
import RestaurantThemeSelector from './components/RestaurantThemeSelector';

import './styles/common.style.css';
import './styles/restaurantAddForm.style.css';
import './styles/restaurantDetail.style.css';
import './styles/restaurantItem.style.css';
import './styles/restaurantModal.style.css';
import './styles/restaurantThemeSelector.style.css';

customElements.define('lunch-picker-app', LunchPickerApp);
customElements.define('lunch-picker-header', LunchPickerHeader);
customElements.define('lunch-picker-modal', LunchPickerModal);
customElements.define('restaurant-theme-selector', RestaurantThemeSelector);
customElements.define('restaurant-list', RestaurantList);
customElements.define('filter-box', FilterBox);
customElements.define('restaurant-item', RestaurantItem);
