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
import ModalEventHandler from './eventHandler/ModalEventHadler';

const $restaurantList = document.querySelector('.restaurant-list');
const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());
new ModalEventHandler(restaurantList);

const handleCategoryFilter = () => {
  const $categoryFilter = document.getElementById('category-filter');
  const $sortingFilter = document.getElementById('sorting-filter');

  const categoryOptions = $categoryFilter.options;
  const category = categoryOptions[categoryOptions.selectedIndex].text;
  const sortingOptions = $sortingFilter.options;
  const sortingCondition = sortingOptions[sortingOptions.selectedIndex].text;

  restaurantList.filterByCategory(category);
  const sortedList = restaurantList.getSortedByCondition(sortingCondition);
  $restaurantList.replaceChildren();
  sortedList.forEach(element => {
    $restaurantList.innerHTML += RestaurantComponent(element.information);
  });
};

const handleSortingFilter = () => {
  const $sortingFilter = document.getElementById('sorting-filter');
  const options = $sortingFilter.options;
  const sortingCondition = options[options.selectedIndex].text;

  const sortedList = restaurantList.getSortedByCondition(sortingCondition);
  $restaurantList.replaceChildren();
  sortedList.forEach(element => {
    $restaurantList.innerHTML += RestaurantComponent(element.information);
  });
};

const init = () => {
  restaurantList.restaurants.forEach(element => {
    $restaurantList.innerHTML += RestaurantComponent(element.information);
  });

  // 홈화면 select 생성
  const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
  new SelectBoxComponent({
    $target: $restaurantFilterContainer,
    attributes: FILTERED_CATEGORY_ATTRIBUTE,
    eventHandler: handleCategoryFilter,
    options: FILTERED_CATEGORY,
  });

  new SelectBoxComponent({
    $target: $restaurantFilterContainer,
    attributes: SORTING_ATTRIBUTE,
    eventHandler: handleSortingFilter,
    options: SORTING,
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
};

init();
new HomeEventHandler();
