import '../templates/style.css';
import '../templates/add-button.png';
import Restaurant from './Restaurant';
import RestaurantList from './RestaurantList';
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

const $restaurantList = document.querySelector('.restaurant-list');
const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());
restaurantList.restaurants.forEach(element => {
  $restaurantList.innerHTML += RestaurantComponent(element.information);
});

const $restaurantFilterContainer = document.querySelector('.restaurant-filter-container');
$restaurantFilterContainer.innerHTML += SelectBoxComponent(FILTERED_CATEGORY_ATTRIBUTE, FILTERED_CATEGORY);
$restaurantFilterContainer.innerHTML += SelectBoxComponent(SORTING_ATTRIBUTE, SORTING);

// form select box 생성
const $categoryContainer = document.getElementById('category-container');
const $distanceContainer = document.getElementById('distance-container');
$categoryContainer.insertAdjacentHTML('beforeend', SelectBoxComponent(FORM_CATEGORY_ATTRIBUTE, FORM_CATEGORY));
$distanceContainer.insertAdjacentHTML('beforeend', SelectBoxComponent(FORM_DISTANCE_ATTRIBUTE, FORM_DISTANCE));

// 상단 우측 버튼 클릭 시 modal open
const $modal = document.querySelector('.modal');
const $gnbButton = document.querySelector('.gnb__button');
$gnbButton.addEventListener('click', () => {
  $modal.classList.add('modal--open');
});
