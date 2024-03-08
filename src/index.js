import LunchPickerApp from './components/LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader';
import FilterBox from './components/FilterBox';
import RestaurantList from './components/RestaurantList';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantAddModal from './components/RestaurantAddModal';

import './styles/style.css';

customElements.define('lunch-picker-app', LunchPickerApp);
customElements.define('lunch-picker-header', LunchPickerHeader);
customElements.define('restaurant-list', RestaurantList);
customElements.define('filter-box', FilterBox);
customElements.define('restaurant-info', RestaurantInfo);
customElements.define('restaurant-add-modal', RestaurantAddModal);
