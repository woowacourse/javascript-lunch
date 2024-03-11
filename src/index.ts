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

const createCategorySelect = ($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList): void => {
  new SelectBoxComponent({
    kind: 'category',
    $target: $restaurantFilterContainer,
    attributes: FILTERED_CATEGORY_ATTRIBUTE,
    options: FILTERED_CATEGORY,
    restaurantList,
  });
};

const createSortingSelect = ($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList): void => {
  new SelectBoxComponent({
    kind: 'sorting',
    $target: $restaurantFilterContainer,
    attributes: SORTING_ATTRIBUTE,
    options: SORTING,
    restaurantList,
  });
};

const createHomeSelect = (restaurantList: RestaurantList): void => {
  const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container') as HTMLElement;
  createCategorySelect($restaurantFilterContainer, restaurantList);
  createSortingSelect($restaurantFilterContainer, restaurantList);
};

const createModalFormSelect = (restaurantList: RestaurantList): void => {
  const $categoryContainer = dom.getElement('#category-container') as HTMLElement;
  new SelectBoxComponent({
    $target: $categoryContainer,
    attributes: FORM_CATEGORY_ATTRIBUTE,
    options: FORM_CATEGORY,
    restaurantList,
  });

  const $distanceContainer = dom.getElement('#distance-container') as HTMLElement;
  new SelectBoxComponent({
    $target: $distanceContainer,
    attributes: FORM_DISTANCE_ATTRIBUTE,
    options: FORM_DISTANCE,
    restaurantList,
  });
};

const createModalFormButton = (restaurantList: RestaurantList): void => {
  const $buttonContainer = dom.getElement('.button-container') as HTMLElement;

  new Button({
    kind: 'close',
    $target: $buttonContainer,
    attributes: CLOSE_BUTTON_ATTRIBUTE,
    handleCloseModal,
  });

  new Button({
    kind: 'add',
    $target: $buttonContainer,
    attributes: ADD_BUTTON_ATTRIBUTE,
    restaurantList,
    handleCloseModal,
  });
};

const handleOpenModal = (): void => {
  dom.getElement('.modal').classList.add('modal--open');
};

const handleCloseModal = (): void => {
  dom.getElement('.modal').classList.remove('modal--open');
  dom.getElement('#error-link').classList.add('hidden');
  const $form = dom.getElement('form') as HTMLFormElement;
  $form.reset();
};

const init = (): void => {
  const getDefaultRestaurantList = (): RestaurantList =>
    new RestaurantList(DEFAULT_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));
  const restaurantList = getDefaultRestaurantList();

  const $restaurantList = dom.getElement('.restaurant-list') as HTMLElement;
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
