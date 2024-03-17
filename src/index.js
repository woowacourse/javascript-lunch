import '../templates/style.css';
import '../templates/add-button.png';
import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';
import RestaurantComponent from './components/Restaurant';
import { DEFAULT_RESTAURAMT_LIST } from './constants/config';
import Header from './components/Header';
import RestaurantTapContainer from './components/RestaurantTapContainer';
import RestaurantFilterContainer from './components/RestaurantFilterContainer';

const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());

const init = () => {
  Header.set(restaurantList);
  new RestaurantTapContainer(restaurantList);
  new RestaurantFilterContainer(restaurantList).createFilters();
  RestaurantComponent.setRestaurantList(restaurantList);
  RestaurantComponent.createRestaurants(restaurantList.getSortedByName());
};

init();
