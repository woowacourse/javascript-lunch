import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { clearedModalContainer, showModal } from './modal';
import { store } from './store';

export interface IMethods {
  renderListArticle: ($targetElement: HTMLElement) => void;
}

export default class App {
  $listArticle = document.querySelector('#list-article') as HTMLElement;
  header: Header;
  tabs: Tabs;
  restaurantForm: RestaurantForm;
  filters: Filters;
  restaurantList: RestaurantList;

  constructor() {
    this.header = new Header();
    this.tabs = new Tabs();
    this.restaurantForm = new RestaurantForm();
    this.filters = new Filters();
    this.restaurantList = new RestaurantList();

    store.setRestaurantListAndFilters({
      filters: this.filters,
      restaurantList: this.restaurantList,
    });

    store.currentList = store.restaurantService.getRestaurantsInfo();

    store.renderListArticle();
    this.initialAddEventListener();
  }

  initialAddEventListener() {
    this.header.addHeaderEventListener(this.headerButtonHandler.bind(this));
    this.tabs.addTabEventListener();
  }

  headerButtonHandler(event: MouseEvent) {
    const { currentTarget } = event;
    if (!(currentTarget instanceof HTMLButtonElement)) return;

    const $container = clearedModalContainer();
    if (!$container || !($container instanceof HTMLElement)) return;

    showModal();
    this.restaurantForm.render($container);
  }

  renderAllList($targetElement: HTMLElement) {
    const { filters, restaurantList } = this;

    store.currentList = store.getCurrentFilteredAndSortedList();

    filters.render($targetElement);
    restaurantList.render($targetElement); // 이 filter와 render를 참조해야 하는데 이게 쉽지 않음;;
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favoriteNameSorted = store.getFavoriteList();
    store.currentList = favoriteNameSorted;

    this.restaurantList.render($targetElement);
  }
}
