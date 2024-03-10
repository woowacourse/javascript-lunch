import '../templates/style.css';
import '../templates/add-button.png';
import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';
import RestaurantComponent from './components/Restaurant';
import SelectBoxComponent from './components/SelectBox';
import { DEFAULT_RESTAURANT_LIST } from './constants/config';
import {
  ADD_BUTTON_ATTRIBUTE,
  CLOSE_BUTTON_ATTRIBUTE,
  FILTERED_CATEGORY,
  FILTERED_CATEGORY_ATTRIBUTE,
  FORM_CATEGORY,
  FORM_CATEGORY_ATTRIBUTE,
  FORM_DISTANCE,
  FORM_DISTANCE_ATTRIBUTE,
  SORTING,
  SORTING_ATTRIBUTE,
} from './constants/filter';
import HomeEventHandler from './eventHandler/HomeEventHandler';
import ModalEventHandler from './eventHandler/ModalEventHandler';
import Button from './components/Button';

const createCategorySelect = ($restaurantFilterContainer, restaurantList) => {
  return new SelectBoxComponent({
    kind: 'category',
    $target: $restaurantFilterContainer,
    attributes: FILTERED_CATEGORY_ATTRIBUTE,
    options: FILTERED_CATEGORY,
    restaurantList,
  });
};

const createSortingSelect = ($restaurantFilterContainer, restaurantList) => {
  return new SelectBoxComponent({
    kind: 'sorting',
    $target: $restaurantFilterContainer,
    attributes: SORTING_ATTRIBUTE,
    options: SORTING,
    restaurantList,
  });
};

const createHomeSelect = restaurantList => {
  const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
  createCategorySelect($restaurantFilterContainer, restaurantList);
  createSortingSelect($restaurantFilterContainer, restaurantList);
};

const createModalFormSelect = () => {
  const $categoryContainer = document.getElementById('category-container');
  new SelectBoxComponent({
    $target: $categoryContainer,
    attributes: FORM_CATEGORY_ATTRIBUTE,
    options: FORM_CATEGORY,
  });

  const $distanceContainer = document.getElementById('distance-container');
  new SelectBoxComponent({
    $target: $distanceContainer,
    attributes: FORM_DISTANCE_ATTRIBUTE,
    options: FORM_DISTANCE,
  });
};

const createModalFormButton = () => {
  const $buttonContainer = document.querySelector('.button-container');

  new Button({
    $target: $buttonContainer,
    attributes: CLOSE_BUTTON_ATTRIBUTE,
  });
  new Button({
    $target: $buttonContainer,
    attributes: ADD_BUTTON_ATTRIBUTE,
  });
};

const init = () => {
  const getDefaultRestaurantList = () =>
    new RestaurantList(DEFAULT_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));
  const restaurantList = getDefaultRestaurantList();

  const $restaurantList = document.querySelector('.restaurant-list');
  restaurantList.restaurants.forEach(restaurant => {
    new RestaurantComponent({ $target: $restaurantList, information: restaurant.information });
  });

  createHomeSelect(restaurantList);
  createModalFormSelect();
  createModalFormButton();

  new HomeEventHandler();
  new ModalEventHandler(restaurantList);
};

init();
