import RestaurantApp from './components/RestaurantApp';
import CustomHeader from './components/CustomHeader';
import FilterBox from './components/FilterBox';
import RestaurantList from './components/RestaurantList';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantAddModal from './components/RestaurantAddModal';

import './styles/style.css';

customElements.define('restaurant-app', RestaurantApp);
customElements.define('custom-header', CustomHeader);
customElements.define('restaurant-list', RestaurantList);
customElements.define('filter-box', FilterBox);
customElements.define('restaurant-info', RestaurantInfo);
customElements.define('restaurant-add-modal', RestaurantAddModal);
