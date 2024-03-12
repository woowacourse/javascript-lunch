import LunchPickerApp from './components/LunchPickerApp';
import LunchPickerHeader from './components/LunchPickerHeader';
import FilterBox from './components/FilterBox';
import RestaurantList from './components/RestaurantList';
import RestaurantItem from './components/RestaurantItem';
import RestaurantAddModal from './components/RestaurantAddModal';
import CategoryIcon from './components/CategoryIcon';

import './styles/style.css';

customElements.define('lunch-picker-app', LunchPickerApp);
customElements.define('lunch-picker-header', LunchPickerHeader);
customElements.define('restaurant-list', RestaurantList);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-add-modal', RestaurantAddModal);
customElements.define('filter-box', FilterBox);
customElements.define('category-icon', CategoryIcon);

document.addEventListener('DOMContentLoaded', () => {
  const app = new LunchPickerApp();
  document.body.appendChild(app);
});
