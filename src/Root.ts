import Matzip from './matzip';
import storage from './storage';
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import Condition from './constants/Condition';

import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/restaurant/Restaurant';
import ListContainer from './components/ListContainer';
import RestaurantForm from './components/RestaurantForm';
import Modal from './components/modal/Modal';

const { $ } = DOM;
const { CATEGORY } = Condition;

const root = {
  init() {
    const matzip = new Matzip(storage.getData());
    this.initList(matzip);
    this.createAddModal();
    this.listenCategoryChange(matzip);
    this.listenRestaurantAdd(matzip);
  },

  appendMain(content: HTMLElement) {
    $<HTMLElement>('main').appendChild(content);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      const initSort = $<HTMLSelectElement>('#sorting-filter');
      const sortBy = initSort.options[initSort.selectedIndex].value;
      const restaurantElements: Restaurant[] = matzip.filterAndSort(CATEGORY.whole, sortBy as SortType).map((restaurant) => new Restaurant(restaurant));
      const listContainer = new ListContainer(restaurantElements);
      this.appendMain(listContainer);
    });
  },

  createAddModal() {
    const modal = new Modal({ classname: 'modal', title: '새로운 음식점', child: new RestaurantForm() });
    this.appendMain(modal);
    this.listenModalToggle(modal);
  },

  listenModalToggle(modal: Modal) {
    $<HTMLDivElement>('.modal-backdrop').addEventListener('click', () => {
      modal.toggleModal('modal');
    });
    $<HTMLButtonElement>('.modal--close').addEventListener('click', () => {
      modal.toggleModal('modal');
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

      const listContainer = new ListContainer(restaurantElements);      
      this.appendMain(listContainer);
    });
  },

  listenRestaurantAdd(matzip: Matzip) {
    const form = $<RestaurantForm>('#restaurant-form'); 

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formFields = form.getFormFields();      
      const fieldValues = formFields.map((field) => field.getValue());

      const newRestaurant: RestaurantType = {
        id: crypto.randomUUID().replace(/-/g, ''),
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
        $<ListContainer>('.restaurant-lists').addRestaurants(new Restaurant(newRestaurant));
      } catch (error) {
        alert(error);
      }
    });
  },
};

export default root;
