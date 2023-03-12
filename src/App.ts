import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantForm from './components/RestaurantForm';
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
    this.restaurantForm = new RestaurantForm(this.renderListArticle.bind(this));
    this.filters = new Filters(
      this.$listArticle,
      this.renderAllList.bind(this)
    );
    this.restaurantList = new RestaurantList(this.$listArticle, {
      renderListArticle: this.renderListArticle.bind(this),
    });

    store.currentList = store.restaurantService.getRestaurantsInfo();

    this.renderListArticle(this.$listArticle);
    this.initialAddEventListener();
  }

  initialAddEventListener() {
    this.header.addHeaderEventListener(this.headerButtonHandler);
    this.tabs.addTabEventListener(this.renderListArticle.bind(this));
  }

  headerButtonHandler(event: MouseEvent) {
    const { currentTarget } = event;
    if (!(currentTarget instanceof HTMLButtonElement)) return;

    const $container = clearedModalContainer();
    if (!$container || !($container instanceof HTMLElement)) return;

    showModal();
    this.restaurantForm.render($container);
  }

  renderListArticle($targetElement: HTMLElement) {
    $targetElement.innerHTML = '';
    const { currentTab } = store;

    switch (currentTab) {
      case 'all':
        this.renderAllList($targetElement);
        break;
      case 'favorite':
        this.renderFavoriteList($targetElement);
        break;
      default:
        return;
    }
  }

  renderAllList($targetElement: HTMLElement) {
    const { filters, restaurantList } = this;
    const { currentCategory, currentFilter } = store;

    const filteredAndSortedList =
      store.restaurantService.getFilteredAndSortedList(
        currentCategory,
        currentFilter
      );
    store.currentList = filteredAndSortedList;

    filters.render($targetElement);
    restaurantList.render($targetElement); // 이 filter와 render를 참조해야 하는데 이게 쉽지 않음;;
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favoriteNameSorted = store.getFavoriteList();
    store.currentList = favoriteNameSorted;

    this.restaurantList.render($targetElement);
  }
}
