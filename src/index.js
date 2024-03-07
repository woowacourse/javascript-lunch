import '../templates/style.css';
import Restaurant from './Restaurant';
import RestaurantList from './RestaurantList';
import RestaurantComponent from './components/Restaurant';
import SelectBoxComponent from './components/SelectBox';
import { DEFAULT_RESTAURAMT_LIST } from './constants/config';
import { CATEGORY, CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from './constants/filter';

const $restaurantList = document.querySelector('.restaurant-list');
const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());

restaurantList.restaurants.forEach(element => {
  $restaurantList.innerHTML += RestaurantComponent(element.information);
});

const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
$restaurantFilterContainer.innerHTML += SelectBoxComponent(CATEGORY_ATTRIBUTE, CATEGORY);
$restaurantFilterContainer.innerHTML += SelectBoxComponent(SORTING_ATTRIBUTE, SORTING);
