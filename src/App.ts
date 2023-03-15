import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { clearedModalContainer, showModal } from './modal';
import { store } from './store';

export default class App {
  header: Header;
  tabs: Tabs;
  restaurantForm: RestaurantForm;
  filters: Filters;
  restaurantList: RestaurantList;

  constructor() {
    const $listArticle = document.querySelector('#list-article') as HTMLElement;

    store.setListArticle($listArticle);

    this.header = new Header(document.body);
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
  }

  headerButtonHandler(event: MouseEvent) {
    const { currentTarget } = event;
    if (!(currentTarget instanceof HTMLButtonElement)) return;

    const $container = clearedModalContainer();
    if (!$container || !($container instanceof HTMLElement)) return;

    showModal();
    this.restaurantForm.render($container);
  }
}
