import '../templates/style.css';
import '../templates/add-button.png';
import Restaurant from './domain/Restaurant';
import RestaurantList from './domain/RestaurantList';
import RestaurantComponent from './components/Restaurant';
import SelectBoxComponent from './components/SelectBox';
import { DEFAULT_RESTAURAMT_LIST } from './constants/config';
import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from './constants/filter';
import HomeEventHandler from './eventHandler/HomeEventHandler';
import Header from './components/Header';
import RestaurantTapContainer from './components/RestaurantTapContainer';

const getDefaultRestaurantList = () => DEFAULT_RESTAURAMT_LIST.map(restaurant => new Restaurant(restaurant));
const restaurantList = new RestaurantList(getDefaultRestaurantList());

const init = () => {
  Header.set(restaurantList);
  new RestaurantTapContainer(restaurantList);
  RestaurantComponent.render(restaurantList.getSortedByName());
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
};

init();
