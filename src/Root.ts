import Matzip from './matzip';
import storage from './storage';
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import Condition from './constants/Condition';

import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/restaurant/Restaurant';
import ListContainer from './components/ListContainer';
import RestaurantForm from './components/RestaurantForm';

const { $, insertElementsInTarget } = DOM;
const { CATEGORY } = Condition;

const root = {
  init() {
    const matzip = new Matzip(storage.getData());
    this.initList(matzip);
    this.listenCategoryChange(matzip);
    this.listenRestaurantAdd(matzip);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      const initSort = $<HTMLSelectElement>('#sorting-filter');
      const sortBy = initSort.options[initSort.selectedIndex].value;
      const listContainer = new ListContainer();
      const restaurantElements: Restaurant[] = matzip.filterAndSort(CATEGORY.whole, sortBy as SortType).map((restaurant) => new Restaurant(restaurant));

      insertElementsInTarget(listContainer, restaurantElements);
      $<HTMLElement>('main').appendChild(listContainer);
    });
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('filterChange', (event: Event) => {
      $<ListContainer>('.restaurant-lists').remove();

      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurantElements: Restaurant[] = matzip.filterAndSort(
        selectedCategory as CategoryType,
        selectedSort as SortType,
      ).map((restaurant) => new Restaurant(restaurant));

      const listContainer = new ListContainer();      
      insertElementsInTarget(listContainer, restaurantElements);
      $<HTMLElement>('main').appendChild(listContainer);
    });
  },

  listenRestaurantAdd(matzip: Matzip) {
    const form = $<RestaurantForm>('#restaurant-form'); 

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formFields = form.getFormFields();      
      const fieldValues = formFields.map((field) => field.getValue());

      const newRestaurant: RestaurantType = {
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1],
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      try {
        matzip.add(newRestaurant);
        
        storage.addData(newRestaurant);
        $<HTMLElement>('.modal').classList.remove('modal--open');
        $<HTMLUListElement>('.restaurant-lists').appendChild(new Restaurant(newRestaurant));
      } catch (error) {
        alert(error);
      }
    });
  },
};

export default root;
