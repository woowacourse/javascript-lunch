import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { IRestaurant } from './domain/Restaurant';
import { store } from './store';

interface IAppState {
  filters: Filters;
  restaurantList: RestaurantList;
}

export interface IMethods {
  renderListArticle: () => void;
}

export default class App {
  $listArticle = document.createElement('article');
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');

    $app.appendChild(Header(this.renderListArticle.bind(this)));
    $app.appendChild($main);
    $main.appendChild(Tabs(this.renderListArticle.bind(this)));
    $main.appendChild(this.$listArticle);
    store.currentList = store.restaurantService.getRestaurantsInfo();

    const filters = new Filters(
      this.$listArticle,
      this.renderAllList.bind(this)
    );
    const restaurantList = new RestaurantList(this.$listArticle, {
      renderListArticle: this.renderListArticle.bind(this),
    });

    this.state = {
      filters,
      restaurantList,
    };

    this.renderListArticle();
  }

  renderListArticle() {
    this.$listArticle.innerHTML = '';
    const { currentTab } = store;

    switch (currentTab) {
      case 'all':
        this.renderAllList(this.$listArticle);
        break;
      case 'favorite':
        this.renderFavoriteList(this.$listArticle);
        break;
      default:
        return;
    }
  }

  renderAllList($targetElement: HTMLElement) {
    const { filters, restaurantList } = this.state;
    const { currentCategory, currentFilter } = store;

    const filteredAndSortedList =
      store.restaurantService.getFilteredAndSortedList(
        currentCategory,
        currentFilter
      );
    store.currentList = filteredAndSortedList;

    filters.render($targetElement);
    restaurantList.render($targetElement);
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favoriteNameSorted = store.getFavoriteList();
    store.currentList = favoriteNameSorted;

    this.state.restaurantList.render($targetElement);
  }
}
