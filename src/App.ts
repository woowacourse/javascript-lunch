import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import Tabs from './components/Tabs';
import { IRestaurant } from './domain/Restaurant';
import { store } from './store';
import { TabType } from './types/type';

interface IAppState {
  filters: Filters;
  restaurantList: RestaurantList;
}

export interface IMethods {
  renderListArticle: ($currentTarget: TabType) => void;
  deleteHandler: (id: number) => void;
}

export default class App {
  $listArticle = document.createElement('article');
  state: IAppState;

  constructor($app: HTMLDivElement) {
    const $main = document.createElement('main');

    $app.appendChild(Header(this.addRestaurantInfo.bind(this)));
    $app.appendChild($main);
    $main.appendChild(Tabs(this.renderListArticle.bind(this)));
    $main.appendChild(this.$listArticle);

    const initialResutaurantInfos =
      store.restaurantService.getRestaurantsInfo();

    const filters = new Filters(
      this.$listArticle,
      this.renderAllList.bind(this)
    );
    const restaurantList = new RestaurantList(
      this.$listArticle,
      initialResutaurantInfos,
      {
        renderListArticle: this.renderListArticle.bind(this),
        deleteHandler: this.deleteRestaurantInfo.bind(this),
      }
    );

    this.state = {
      filters,
      restaurantList,
    };

    this.renderListArticle(store.currentTab);
  }

  renderListArticle(currentTab?: TabType) {
    this.$listArticle.innerHTML = '';
    if (!currentTab) currentTab = 'all';

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

    restaurantList.setState({
      ...restaurantList.state,
      restaurantList: filteredAndSortedList,
    });

    filters.render($targetElement);
    restaurantList.render($targetElement);
  }

  renderFavoriteList($targetElement: HTMLElement) {
    const favoriteNameSorted = store.getFavoriteList();

    this.state.restaurantList.setState({
      ...this.state.restaurantList.state,
      restaurantList: favoriteNameSorted,
    });
    this.state.restaurantList.render($targetElement);
  }

  addRestaurantInfo(restaurantInfo: IRestaurant) {
    store.restaurantService.addRestaurant(restaurantInfo);

    this.renderListArticle(store.currentTab);

    store.updateLocalStorage();
  }

  deleteRestaurantInfo(id: number) {
    store.restaurantService.deleteRestaurant(id);

    this.renderListArticle(store.currentTab);

    store.updateLocalStorage();
  }
}
