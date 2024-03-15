import '../templates/style.css';
import '../templates/add-button.png';
import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';
import RestaurantComponent from './components/Restaurant';
import SelectBoxComponent from './components/SelectBox';
import { DEFAULT_RESTAURAMT_LIST } from './constants/config';
import {
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

const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());

const init = () => {
  RestaurantComponent.render(restaurantList.restaurants);
  new ModalEventHandler(restaurantList);
  const homeEventHandler = new HomeEventHandler(restaurantList);
  // 홈화면 select 생성
  const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');

  const filterByCategoryInformation = {
    $target: $restaurantFilterContainer,
    attributes: FILTERED_CATEGORY_ATTRIBUTE,
    eventHandler: () => {
      homeEventHandler.handleFilter();
    },
    options: FILTERED_CATEGORY,
  };
  SelectBoxComponent.render(filterByCategoryInformation);

  const sortingInformation = {
    $target: $restaurantFilterContainer,
    attributes: SORTING_ATTRIBUTE,
    eventHandler: () => {
      homeEventHandler.handleFilter();
    },
    options: SORTING,
  };
  SelectBoxComponent.render(sortingInformation);

  // 모달 form select 생성
  const $categoryContainer = document.getElementById('category-container');
  const $distanceContainer = document.getElementById('distance-container');

  const formCategoryInformation = {
    $target: $categoryContainer,
    attributes: FORM_CATEGORY_ATTRIBUTE,
    options: FORM_CATEGORY,
  };
  SelectBoxComponent.render(formCategoryInformation);

  const formDistanceInformation = {
    $target: $distanceContainer,
    attributes: FORM_DISTANCE_ATTRIBUTE,
    options: FORM_DISTANCE,
  };
  SelectBoxComponent.render(formDistanceInformation);
};

init();
