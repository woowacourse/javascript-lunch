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
import FavoriteIcon from './FavoriteIcon';
import RestaurantCategory from './RestaurantCategory';
import RestaurantName from './RestaurantName';
import RestaurantDistance from './RestaurantDistance';
import RestaurantDescription from './RestaurantDescription';
import RestaurantListContainer from './RestaurantListContainer';

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

  restaurantListContainer: new RestaurantListContainer({
    container: '.restaurant-list-container',
    id: 'restaurant-list-container',
  }),

  favoriteListContainer: new RestaurantListContainer({
    container: '.restaurant-list-container',
    id: 'favorite-list-container',
  }),

  restaurantList: new RestaurantList({
    container: '.restaurant-list',
    nameComponent: new RestaurantName({ container: '' }),
    distanceComponent: new RestaurantDistance({ container: '' }),
    categoryComponent: new RestaurantCategory({ container: '.restaurant__category' }),
    favoriteComponent: new FavoriteIcon({ container: '.favorite-icon-container' }),
    descriptionComponent: new RestaurantDescription({ container: '' }),
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
    nameComponent: new RestaurantName({ container: '' }),
    distanceComponent: new RestaurantDistance({ container: '' }),
    categoryComponent: new RestaurantCategory({ container: '.restaurant__category' }),
    favoriteComponent: new FavoriteIcon({ container: '.favorite-icon-container' }),
    descriptionComponent: new RestaurantDescription({ container: '' }),
  }),

  initRender() {
    this.header.render();
    this.navBar.render();
    this.categoryFilter.render();
    this.sortingFilter.render();
    this.restaurantListContainer.render();
    this.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
    this.restaurantAddModal.render();
    this.restaurantAddModalContent.render();
    this.restaurantBottomSheet.render();
  },
};
