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

  // 홈화면 select box 생성
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

  // 모달 form select box 생성
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

// 상단 우측 버튼 클릭 시 modal open
const $modal = document.querySelector('.modal');
const $gnbButton = document.querySelector('.gnb__button');

const handleOpenModal = () => {
  $modal.classList.add('modal--open');
};

$gnbButton.addEventListener('click', handleOpenModal);

// 추가하기 버튼 클릭 시 form submit 이벤트
const $restaurantForm = document.querySelector('form');

const handleAddRestaurant = e => {
  e.preventDefault();
  const category = $restaurantForm.elements.category.value;
  const name = $restaurantForm.elements.name.value;
  const distance = Number($restaurantForm.elements.distance.value);
  const description = $restaurantForm.elements.description.value;
  const link = $restaurantForm.elements.link.value;
  const restaurantInformation = new Restaurant({ category, name, distance, description, link });

  restaurantList.add(restaurantInformation);
  const lastElement = restaurantList.restaurants[restaurantList.restaurants.length - 1];
  $restaurantList.insertAdjacentHTML('beforeend', RestaurantComponent(lastElement.information));
  handleCloseModal();
};

// 취소하기 버튼 클릭 시 modal close
// const $modal = document.querySelector('.modal');
const $closeButton = document.querySelector('#button-close');
const handleCloseModal = () => {
  $modal.classList.remove('modal--open');
  $restaurantForm.reset();
};

$restaurantForm.addEventListener('submit', e => handleAddRestaurant(e));
$closeButton.addEventListener('click', handleCloseModal);
