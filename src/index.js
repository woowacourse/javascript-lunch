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

// category 필터링 셀렉트 박스 이벤트
const $categoryFilter = document.getElementById('category-filter');

$categoryFilter.addEventListener('change', () => {
  const options = $categoryFilter.options;
  const category = options[options.selectedIndex].text;
  const filteredRestaurantList = restaurantList.filterByCategory(category);

  $restaurantList.replaceChildren();
  filteredRestaurantList.forEach(element => {
    $restaurantList.innerHTML += RestaurantComponent(element.information);
  });
});

// 상단 우측 버튼 클릭 시 modal open
const $modal = document.querySelector('.modal');
const $gnbButton = document.querySelector('.gnb__button');
$gnbButton.addEventListener('click', () => {
  $modal.classList.add('modal--open');
});

// 취소하기 버튼 클릭 시 modal close
const $closeButton = document.querySelector('#button-close');
$closeButton.addEventListener('click', () => {
  $modal.classList.remove('modal--open');
});

// 추가하기 버튼 클릭 시 form submit 이벤트
const $restaurantForm = document.querySelector('form');
$restaurantForm.addEventListener('submit', e => {
  e.preventDefault();
  const category = $restaurantForm.elements.category.value;
  const name = $restaurantForm.elements.name.value;
  const distance = $restaurantForm.elements.distance.value;
  const description = $restaurantForm.elements.description.value;
  const link = $restaurantForm.elements.link.value;
  const restaurantInformation = new Restaurant({ category, name, distance, description, link });

  restaurantList.add(restaurantInformation);
  const lastElement = restaurantList.restaurants[restaurantList.restaurants.length - 1];
  $restaurantList.insertAdjacentHTML('beforeend', RestaurantComponent(lastElement.information));
  $modal.classList.remove('modal--open');
});
