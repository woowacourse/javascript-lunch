import RestaurantApp from './components/RestaurantApp';
import CustomHeader from './components/CustomHeader';
import FilterBox from './components/FilterBox';
import FilterBoxContainer from './components/FilterBoxContainer';
import RestaurantList from './components/RestaurantList';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantAddModal from './components/RestaurantAddModal';

import '../templates/style.css';

customElements.define('restaurant-app', RestaurantApp);
customElements.define('custom-header', CustomHeader);
customElements.define('restaurant-list', RestaurantList);
customElements.define('filter-box', FilterBox);
customElements.define('filter-box-container', FilterBoxContainer);
customElements.define('restaurant-info', RestaurantInfo);
customElements.define('restaurant-add-modal', RestaurantAddModal);

import Restaurants from './domain/Restaurants';
import Restaurant from './domain/Restaurant';

localStorage.clear();

Restaurants.addRestaurant(
  new Restaurant({
    category: '한식',
    name: '파슬리네 김치찌개',
    distance: 5,
  }),
);

Restaurants.addRestaurant(
  new Restaurant({
    category: '중식',
    name: '파슬리네 짜장면',
    distance: 10,
  }),
);

Restaurants.addRestaurant(
  new Restaurant({
    category: '일식',
    name: '파슬리네 초밥',
    distance: 15,
  }),
);
