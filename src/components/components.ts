import Header from './Header';
import Navigation from './Navigation';
import Select from './Select';
import RestaurantList from './RestaurantList';
import Modal from './Modal';
import RestaurantAddContainer from './RestaurantAddContainer';
import RestaurantBottomSheet from './RestaurantBottomSheet';
import { FILTER_ID, FILTER_CLASS, FILTER_NAME } from '../constants/filter';
import { SELECT_OPTION_LIST } from '../constants/filter';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

export const components = {
  header: new Header({ selector: 'header', title: '점심 뭐 먹지' }),

  navBar: new Navigation({ selector: 'nav', class: 'nav-container' }),

  categoryFilter: new Select({
    selector: '.restaurant-filter-container',
    id: FILTER_ID.CATEGORY,
    name: FILTER_NAME.CATEGORY,
    class: FILTER_CLASS,
    optionList: SELECT_OPTION_LIST.CATEGORY,
  }),

  sortingFilter: new Select({
    selector: '.restaurant-filter-container',
    id: FILTER_ID.SORTING,
    name: FILTER_NAME.SORTING,
    class: FILTER_CLASS,
    optionList: SELECT_OPTION_LIST.SORTING,
  }),

  restaurantList: new RestaurantList({
    listRenderSelector: '.restaurant-list',
    additionRenderSelector: '.restaurant',
  }),

  restaurantAddModal: new Modal({
    selector: '.restaurant-add-modal',
    id: 'restaurant-add-modal',
    backdrop: 'restaurant-add-backdrop',
    container: 'restaurant-add-container',
  }),

  restaurantAddContainer: new RestaurantAddContainer({
    selector: '.restaurant-add-container',
  }),

  restaurantBottomSheet: new Modal({
    selector: '.restaurant-bottom-sheet',
    id: 'restaurant-bottom-sheet',
    backdrop: 'restaurant-bottom-sheet-backdrop',
    container: 'restaurant-bottom-sheet-container',
  }),

  restaurantBottomSheetContainer: new RestaurantBottomSheet({
    selector: '.restaurant-bottom-sheet-container',
  }),

  initRender() {
    this.header.render();
    this.navBar.render();
    this.categoryFilter.render();
    this.sortingFilter.render();
    this.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
    this.restaurantAddModal.render();
    this.restaurantAddContainer.render();
    this.restaurantBottomSheet.render();
  },
};
