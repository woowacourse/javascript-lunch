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
import Button from './components/button/Button';
import dom from './utils/dom';

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


const createModalFormSelect = (restaurantList) => {
  const $categoryContainer = dom.getElement('#category-container');
  new SelectBoxComponent({
    $target: $categoryContainer,
    attributes: FORM_CATEGORY_ATTRIBUTE,
    options: FORM_CATEGORY,
    restaurantList,
  });

  const $distanceContainer = dom.getElement('#distance-container');
  new SelectBoxComponent({
    $target: $distanceContainer,
    attributes: FORM_DISTANCE_ATTRIBUTE,
    options: FORM_DISTANCE,
    restaurantList,
  });
};

const createModalFormButton = restaurantList => {
  const $buttonContainer = dom.getElement('.button-container');

  new Button({
    kind: 'close',
    $target: $buttonContainer,
    attributes: CLOSE_BUTTON_ATTRIBUTE,
    handleCloseModal: handleCloseModal
  });
  new Button({
    kind: 'add',
    $target: $buttonContainer,
    attributes: ADD_BUTTON_ATTRIBUTE,
    restaurantList,
  });
};

const handleOpenModal = () => {
  document.querySelector('.modal').classList.add('modal--open');
};

const handleCloseModal = () => {
  dom.getElement('.modal').classList.remove('modal--open');
  dom.getElement('#error-link').classList.add('hidden');
  const $form = dom.getElement('form');
  $form.reset();
}

const init = () => {
  const getDefaultRestaurantList = () =>
    new RestaurantList(DEFAULT_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));
  const restaurantList = getDefaultRestaurantList();

  const $restaurantList = document.querySelector('.restaurant-list');
  restaurantList.restaurants.forEach(restaurant => {
    new RestaurantComponent({ $target: $restaurantList, information: restaurant.information });
  });

  createHomeSelect(restaurantList);
  createModalFormSelect(restaurantList);
  createModalFormButton(restaurantList);

  dom.getElement('.gnb__button').addEventListener('click', handleOpenModal);
  dom.getElement('.modal-backdrop').addEventListener('click', handleCloseModal);
};

init();
