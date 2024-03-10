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

const init = () => {
  const $restaurantList = document.querySelector('.restaurant-list');
  const getDefaultRestaurantList = () => DEFAULT_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant));
  const restaurantList = new RestaurantList(getDefaultRestaurantList());

  restaurantList.restaurants.forEach(element => {
    new RestaurantComponent({ $target: $restaurantList, information: element.information });
  });

  // 홈화면 select 생성
  const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
  new SelectBoxComponent({
    kind: 'category',
    $target: $restaurantFilterContainer,
    attributes: FILTERED_CATEGORY_ATTRIBUTE,
    options: FILTERED_CATEGORY,
    restaurantList,
  });

  new SelectBoxComponent({
    kind: 'sorting',
    $target: $restaurantFilterContainer,
    attributes: SORTING_ATTRIBUTE,
    options: SORTING,
    restaurantList,
  });

  // 모달 form select 생성
  const $categoryContainer = document.getElementById('category-container');
  const $distanceContainer = document.getElementById('distance-container');
  new SelectBoxComponent({
    $target: $categoryContainer,
    attributes: FORM_CATEGORY_ATTRIBUTE,
    options: FORM_CATEGORY,
  });
  new SelectBoxComponent({
    $target: $distanceContainer,
    attributes: FORM_DISTANCE_ATTRIBUTE,
    options: FORM_DISTANCE,
  });

  const $buttonContainer = document.querySelector('.button-container');
  new Button({
    $target: $buttonContainer,
    attributes: CLOSE_BUTTON_ATTRIBUTE,
  });

  new Button({
    $target: $buttonContainer,
    attributes: ADD_BUTTON_ATTRIBUTE,
  });

  new HomeEventHandler();
  new ModalEventHandler(restaurantList);
};

init();
