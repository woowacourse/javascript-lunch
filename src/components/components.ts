import Header from './Header';
import Navigation from './Navigation';
import Select from './Select';
import RestaurantList from './RestaurantList';
import Modal from './Modal';
import RestaurantAddModalContent from './RestaurantAddModalContent';
import RestaurantBottomSheetContent from './RestaurantBottomSheetContent';
import { getListOnLocalStorage } from '../utils/localStorage';
import { SELECT_OPTION_LIST } from '../constants/filter';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

export const components = {
  header: new Header({ container: 'header' }),

  navBar: new Navigation({ container: 'nav' }),

  categoryFilter: new Select({
    container: '.restaurant-filter-container',
    id: 'category-filter',
    name: 'category',
    class: 'restaurant-select',
    optionList: SELECT_OPTION_LIST.CATEGORY,
  }),

  sortingFilter: new Select({
    container: '.restaurant-filter-container',
    id: 'sorting-filter',
    name: 'sorting',
    class: 'restaurant-select',
    optionList: SELECT_OPTION_LIST.SORTING,
  }),

  restaurantList: new RestaurantList({
    additionRenderContainer: '.restaurant',
  }),

  restaurantAddModal: new Modal({
    container: '.restaurant-add-modal',
    modalId: 'restaurant-add-modal',
  }),

  restaurantAddModalContent: new RestaurantAddModalContent({
    container: '#restaurant-add-modal',
  }),

  restaurantBottomSheet: new Modal({
    container: '.restaurant-bottom-sheet',
    modalId: 'restaurant-bottom-sheet',
  }),

  restaurantBottomSheetContent: new RestaurantBottomSheetContent({
    container: '#restaurant-bottom-sheet',
  }),

  initRender() {
    this.header.render();
    this.navBar.render();
    this.categoryFilter.render();
    this.sortingFilter.render();
    this.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
    this.restaurantAddModal.render();
    this.restaurantAddModalContent.render();
    this.restaurantBottomSheet.render();
  },
};
