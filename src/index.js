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

const $restaurantList = document.querySelector('.restaurant-list');
const getDefaultRestaurantList = () => DEFAULT_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());

const getSelectedCategory = () => {
  const $categoryFilter = document.getElementById('category-filter');
  const categoryOptions = $categoryFilter.options;
  return categoryOptions[categoryOptions.selectedIndex].text;
};

const getSelectedSortingCondition = () => {
  const $sortingFilter = document.getElementById('sorting-filter');
  const sortingOptions = $sortingFilter.options;
  return sortingOptions[sortingOptions.selectedIndex].text;
};

const handleCategoryFilter = () => {
  const category = getSelectedCategory();
  const sortingCondition = getSelectedSortingCondition();

  restaurantList.filterByCategory(category);
  const sortedList = restaurantList.getSortedByCondition(sortingCondition);
  $restaurantList.replaceChildren();
  sortedList.forEach(element => {
    new RestaurantComponent({ $target: $restaurantList, information: element.information });
  });
};

const handleSortingFilter = () => {
  const sortingCondition = getSelectedSortingCondition();

  const sortedList = restaurantList.getSortedByCondition(sortingCondition);
  $restaurantList.replaceChildren();
  sortedList.forEach(element => {
    new RestaurantComponent({ $target: $restaurantList, information: element.information });
  });
};

const init = () => {
  restaurantList.restaurants.forEach(element => {
    new RestaurantComponent({ $target: $restaurantList, information: element.information });
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

init();
new HomeEventHandler();
new ModalEventHandler(restaurantList);
