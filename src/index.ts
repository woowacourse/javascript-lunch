import '../templates/style.css';
import '../templates/add-button.png';

import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';
import RestaurantComponent from './components/Restaurant';
import SelectBoxComponent from './components/SelectBox';
import { INITIAL_RESTAURANT_LIST } from './constants/config';
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
import formValidator from './validator/formValidator';
import type { TDistance, TCategory } from './types/restaurant';
import type { IFormInput } from './types/dom';

const getInitialRestaurantList = (): RestaurantList =>
  new RestaurantList(INITIAL_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));

const createCategorySelect = ($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList): void => {
  new SelectBoxComponent({
    $target: $restaurantFilterContainer,
    props: {
      kind: 'category',
      attributes: FILTERED_CATEGORY_ATTRIBUTE,
      options: FILTERED_CATEGORY,
      restaurantList,
    },
  });
};

const createSortingSelect = ($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList): void => {
  new SelectBoxComponent({
    $target: $restaurantFilterContainer,
    props: {
      kind: 'sorting',
      attributes: SORTING_ATTRIBUTE,
      options: SORTING,
      restaurantList,
    },
  });
};

const createHomeSelect = (restaurantList: RestaurantList): void => {
  const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
  createCategorySelect($restaurantFilterContainer, restaurantList);
  createSortingSelect($restaurantFilterContainer, restaurantList);
};

const createModalFormSelect = (restaurantList: RestaurantList): void => {
  const $categoryContainer = dom.getElement('#category-container');
  new SelectBoxComponent({
    $target: $categoryContainer,
    props: {
      attributes: FORM_CATEGORY_ATTRIBUTE,
      options: FORM_CATEGORY,
      restaurantList,
    },
  });

  const $distanceContainer = dom.getElement('#distance-container');
  new SelectBoxComponent({
    $target: $distanceContainer,
    props: {
      attributes: FORM_DISTANCE_ATTRIBUTE,
      options: FORM_DISTANCE,
      restaurantList,
    },
  });
};

const createModalFormButton = (restaurantList: RestaurantList): void => {
  const $buttonContainer = dom.getElement('.button-container');

  new Button({
    $target: $buttonContainer,
    props: {
      kind: 'close',
      attributes: CLOSE_BUTTON_ATTRIBUTE,
      handleCloseModal,
    },
  });

  new Button({
    $target: $buttonContainer,
    props: {
      kind: 'add',
      attributes: ADD_BUTTON_ATTRIBUTE,
      restaurantList,
      handleCloseModal,
    },
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

const getFormInputTag = (): IFormInput => {
  const category = dom.getElement('#category') as HTMLInputElement;
  const name = dom.getElement('#name') as HTMLInputElement;
  const distance = dom.getElement('#distance') as HTMLInputElement;
  const link = dom.getElement('#link') as HTMLInputElement;
  const $addButton = dom.getElement('#button-add') as HTMLButtonElement;
  return { category, name, distance, link, $addButton };
};

const handleFormInput = ({
  category: $category,
  name: $name,
  distance: $distance,
  link: $link,
  $addButton,
}: IFormInput): void => {
  const category = $category.value as TCategory;
  const name = $name.value;
  const distance = $distance.value as unknown as TDistance;
  const referenceLink = $link.value;

  if (formValidator.isValidForm({ category, name, distance, referenceLink })) $addButton.disabled = false;
  else $addButton.disabled = true;
};

const init = (): void => {
  const restaurantList = getInitialRestaurantList();

  const $restaurantList = dom.getElement('.restaurant-list');
  restaurantList.restaurants.forEach(restaurant => {
    new RestaurantComponent({ $target: $restaurantList, information: restaurant.information });
  });

  createHomeSelect(restaurantList);
  createModalFormSelect(restaurantList);
  createModalFormButton(restaurantList);

  const { category, name, distance, link, $addButton } = getFormInputTag();
  dom.getElement('.gnb__button').addEventListener('click', handleOpenModal);
  dom.getElement('.modal-backdrop').addEventListener('click', handleCloseModal);
  dom.getElement('form').addEventListener('input', () => {
    handleFormInput({ category, name, distance, link, $addButton });
  });
};

init();
